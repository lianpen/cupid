# 立项目的
## **一. 使BFF开发如火箭般高效。**
## **二. 使前端和BFF是同一人成为可能。**
## **新旧流程对比**
### **传统BFF开发流程：**
![图片](https://uploader.shimo.im/f/TZmwmPFgTA8qASh5.png!thumbnail)

### **全新火箭式BFF开发流程：**
![图片](https://uploader.shimo.im/f/vbMjRVVKh0sraZ2r.png!thumbnail)

# BFF痛点
## 一. 拉长了上下游链条，消耗精力
原来对于需求理解，沟通，应急解决，都只需要前，后两个研发。现在，在各阶段都需要三个研发了。对于BFF的同学，需要花同样的精力去理解需求，出问题必须在岗。尤其对于全透传的情况下，BFF模式更显得笨重。

## 二. 增加了沟通难度，减低灵敏性
BFF同学往往是一个传话筒的角色。当后端接口不顺畅的时候，前端会先找BFF说接口不通，然后BFF对后端说接口不通；后端对BFF说把参数发我看下，BFF对前端说把参数发我看下；前端把参数发给BFF，BFF把参数发给后端；过段时间后端对BFF说应该可以了你再试试，BFF对前端说你再试试；前端礼貌地对BFF说可以了，BFF礼貌地对后端说可以了。

那么只要BFF和后端只要有一个人在忙于其他事，前端就被挂起了。尤其是对于单接口的情况，这个流程更显得很不灵敏。联调和后期排查都增加定位复杂性。

## 三. 不利于BFF同学个人职业发展
BFF端的同学工作时间主要消耗在业务理解（20%）+ 与前端沟通（10%）+ 数据模型定义（10%）+ 与后端沟通（15%）+ 业务编码（30%） + 运维上线（15%）。这些过程极少能沉淀出个人技术的积累。既不牵涉到后端大并发的性能优化，又不牵涉到前端视图渲染与优化。是容易被规避的工作。

# 全新火箭式开发流程
为了解决上述痛点，全新火箭式BFF呼之欲出。既然编码是机械重复的，那么就应该可以有自动化工具来完成BFF端编码。我们整理了一套理论基础来囊括BFF端可能遇到的所有情况并抽象成模式。工具完整后新的开发流程将包括三阶段：准备，点火，接轨。

## 一. 燃料准备
燃料包括低维度的铀235和高维度的反应堆。后续会详尽的阐述这些理论。

铀235指应对简单单接口抽象出的基本类及其子类。基本类具备共同的准备，请求，适配等行为，公用逻辑在基本类中实现，业务类继承基本类实现暴露的函数。

反应堆指通过并行，串行，策略等手段将铀235组合起来。组合后的反应堆可以再组合其他铀235或其他反应堆成为更高阶的反应堆。

应为一套业务配置关于铀235和反应堆的配置文件，完成燃料准备阶段。

## 二. 点火升空
```
npm run fire
```
使用npm命令 npm run fire，自动生成除了聚合函数以外的全部BFF端所需代码。包括：
1. service文件。代码包括所需的全部Service业务类以及他们的组合代码。除了聚合函数。
2. controller文件。包括接口入参校验，出参规则，描述，调用业务处理流程等全部代码。
3. mock文件。应对这套业务自动生成的mock数据。用于后端接口尚未第一次可调用，以及dev环境下如果后端接口不畅通用于备选的mock数据。
4. type文件。为BFF端数据类型接口添加对应数据类，被上述三组文件依赖。
5. 单元测试文件。接口级单元测试代码。
## 三. 卫星接轨
点火以后，在部分情况下可能需要接轨。也可能不需要这个步骤。

接轨指对于若干个接口获得数据以后的数据聚合，对接前端。后续会详尽阐述。

# 铀235理论基础
要达到工具的目的，前提条件是存在一个理论基础，可以覆盖所有可能遇到的情况。

BFF可能涉及的工作有数据转换，聚合，分发等，可能对各种各样的数据来源做任何可能的处理。可能有分页的查全量，可能带缓存，可能不同入参请求不同的接口，等等。

为了情景全覆盖，我们建立起内核的铀235和外圈的反应堆理论。

铀235指应对一个简单的单接口进行的模型抽象。最简单基本的是BaseService类。

```
export class BaseService implememnt IService 
```
## 四组数据模型
对于一个简单接口请求，牵涉到四组数据强类型Type。

1. 前端给BFF的入参Dto1 
2. BFF给后端的入参Dto2
3. 后端给BFF的出参Dto3
4. BFF给前端的出参Vo

Dto: Data transfer object 数据链路对象

Vo: View Object 视图对象

## 抽象三阶段
任何一个简单接口请求，都可以抽象出三个阶段

1. 准备阶段：将dto1转换成dto2
2. 请求阶段：用dto2请求后端接口得到dto3
3. 适配阶段：将dto3适配成前端最终需要的vo

其中，请求阶段是一定有的，准备阶段和适配阶段是可选的。如果没有准备阶段，那么dto2就是dto1。如果没有适配阶段，那么vo就是dto3。

既然所有的service都有共同的逻辑，我们就定义IService接口和实现基本类。

```
interface IService {
  get(dto: any): Promise<any>;
}
```
基本类BaseService实现共同流程逻辑，业务Service继承BaseService，只实现需要重载的三个阶段函数：
```
class SomeService extends BaseService {
  // 准备阶段 将dto1转换成dto2
  prepare(dto1: Dto1): Dto2 {
    return new Dto2(dto1);    
  }
  // 请求阶段 用dto2请求后端接口得到dto3
  async request(dto2: Dto2): Promise<Dto3> {
    const resp: IDubboResult<BaseResponse<BillDetailResponseDTO[]>> = await DubboInterceptor(
      rpc.IHotelBillService.queryBillDetail(dto)
    );
    return resp.res.data;    
  }
  // 适配阶段 dto3适配成前端最终需要的vo
  adapt(dto3: Dto3): Vo {
    return new Vo(dto3);
  }      
}
```
## 其他基本子类
不是所有的单接口情况都可以归纳为以上三个阶段，会有其余的各种各样情况。但即使是其他情况，也是和基本情况是有关联的。我们将其他情况视为基本类的子类。我们拿分页查全量做举例。对于某些后端接口不支持全量查询，只支持分页查询。那么某些情况下就需要BFF处理了。

```
export class PagerService extends BaseService {
  pageIndex: number;
  pool: Array<Object>;
  isEnded?: boolean;
  constructor(facade: IFacade = null) {
    super(facade);
    this.pageIndex = 0;
    this.pool = [];
    this.isEnded = false;
  }
  async getCore(): Promise<Object> {
    while (!this.isEnded) {
      const dto2: Object = this.prepare(this.dto);
      const dto3: Array<Object> = (await this.request(dto2)) as Array<Object>;
      this.pool = [].concat(this.pool, dto3);
      this.pageIndex += 1;
    }
    const vo = this.adapt(this.pool);
    return vo;
  }
  endLoop() {
    this.isEnded = true;
  }
}
```
这个基本子类总的三阶段大致是和BaseService是一样的，于是继承BaseService，差异在于一些私有成员的定义，以及有循环请求直至结束。重载getCore函数即可。
还会有其他情况，比如带BFF缓存的请求的统一处理等，需要业务线上的总结把他想全。

# 核反应堆理论基础
铀235比喻成一个单一的后端接口请求，但BFF可能需要组合多个数据来源的后端接口，最后组装成前端所需要的内容。我们将组装以后的结构比喻成反应堆。

## 三种组合模式
任何的组合形式，都可以总结为并行，串行，策略三种模式及三种模式的再高阶组合。

```
export enum COMBINE_TYPE {
  BASIC, // 基本
  PARRALLEL, // 并行
  SERIAL, // 串行
  STRATEGY, // 策略
}
```
1. 并行模式

当需要请求多个数据来源时，并行请求是最快的。多道请求同时出发，当全部收到响应后再统一聚合，是最常规的处理方式。es6中的实现是Promise.all。

2. 串行模式

并行不能解决所有的场景。有时前一个请求得到的结果是后一个请求的入参条件。不知道前一个结果就不知道用啥请求后一个。可以若干个请求依次串行环环相扣。

3. 策略模式

有时会根据不用的入参条件请求不同的接口。或者前一个请求的接口会带来后续逻辑走向岔路。用策略模式来分发后续不同的服务走向。

## 模式高阶配置化
我们定义了组合类Combine，即反应堆。构造函数一参是组合类型（并行，串行还是策略），二参是铀235或反应堆列表，三参是聚合函数（可选）。

这是我刚解决的真实业务场景：一个BFF接口需要聚合5个后端接口（铀235）做数据组装。分别是：

```
/**
 * 聚合5接口
 * ChannelServiceClient.allChannel 渠道列表
 * HotelFunctionService.hasFunction 酒店是否使用别名 
 * IRoomServiceClient.searchRoom 搜索房间列表
 * iRoomStatusService.getRoomStatusByRoomIds 根据房间列表查询房态列表
 * IIRoomReservationService.getRoomReservationList 根据房间列表查询预订
```
4，5接口依赖3接口查到的房间列表。于是这套业务的最佳策略是：
1，2，3并行，3有和45串行，45再并行。这样响应速度是最快的。

分析完组合模式，就可以写出配置化编码：

```
  const combine: ICombine = new Combine(
    COMBINE_TYPE.PARRALLEL,
    [
      AllChannelService,
      HasFunctionService,
      new Combine(COMBINE_TYPE.SERIAL, [
        SearchRoomService,
        new Combine(COMBINE_TYPE.PARRALLEL, [GetRoomStatusByRoomIdsService, GetRoomReservationListService]),
      ]),
    ],
    (dtoList: Array<any>, dtoStack: Array<any>) => {
      return combineFutureDtoList(dtoStack[0], dtoStack[1], dtoStack[2], dtoStack[3], dtoStack[4], dtoStack[5]);
    }
  );
  return await new Facade(combine).get(query);
```
一共有三个Combine。
第一个Combine类型是COMBINE_TYPE.PARRALLEL，并行，列表是AllChannelService,HasFunctionService以及第二个Combine。

第二个Combine类型是COMBINE_TYPE.SERIAL，串行，列表是SearchRoomService和第三个Combine。

第二个Combine类型是COMBINE_TYPE.PARRALLEL，并行，列表是GetRoomStatusByRoomIdsService和GetRoomReservationListService

## 聚合函数
任何一个Combine函数的三参都是一个可选的聚合函数。在上述5接口的举例中，第二个Combine和第三个Combine都没有实现聚合函数，是在第一个聚合函数中统一聚合了。聚合的方式是非常灵活的，可以在任意阶段聚合。如果没有实现聚合函数，那么Combine返回的是若干的铀235的适配结果组成的数组；如果实现了聚合函数，那么就返回聚合的结果。

上述举例中，聚合函数如下：

```
    (dtoList: Array<any>, dtoStack: Array<any>) => {
      return combineFutureDtoList(dtoStack[0], dtoStack[1], dtoStack[2], dtoStack[3], dtoStack[4], dtoStack[5]);
    }
```
注意到函数带两个参数。一参dtoList是整个链路上带结构的全部数据，结构形式就是Combine的组合方式；二参dtoStack是拍平(flat)以后的数据堆栈，因为当组合确定的时候顺序就是确定的，使用起来更方便。
# 点火原理及可行性
## 巨人的肩膀
巨人的肩膀是来自java端的jar包！interpret-dubbo2js模块虽然默默无闻，但实现了下载BFF端需要的jar包，解压成.class文件，反编译成.java文件，并翻译成.ts文件。

[https://www.npmjs.com/package/interpret-dubbo2js](https://www.npmjs.com/package/interpret-dubbo2js)

翻译后的typescript语法的package包括了三类文件：

1. service 服务命名空间，方法，对入参和出参的引用和调用。
2. dto 入参数据格式
3. vo 出参数据格式

其中service有对dto和vo的依赖。文件内容如下：

```
import { BillDetailyRequestDTO } from './../dto/BillDetailRequestDTO';
import { BillDetailResponseDTO } from './../dto/BillDetaiResponseDTO';
import { TDubboCallResult, Dubbo } from 'dubbo2.js';
export interface IIHotelBillService {
  queryBillDetail(
    BillDetailyRequestDTO0: BillDetailyRequestDTO,
  ): TDubboCallResult<BaseResponse<Array<BillDetailResponseDTO>>>;
}
export function IHotelBillService(dubbo: Dubbo): IIHotelBillService {
  return dubbo.proxyService<IIHotelBillService>({
    dubboInterface: 'com.oyo.account.service.IHotelBillService',
    methods: IHotelBillServiceWrapper,
  });
}
//generate by interpret-cli dubbo2.js
```
IIHotelBillService是服务名；BillDetailyRequestDTO是入参；BillDetailResponseDTO是出参。
因为有import的相对路径地址，所以node端可以加载到入参和出参全部的信息。于是，一个铀235所需的大部分数据来源就都有了。

## 全透传，半透传与不透传
上文提到过铀235有四组数据类型：dto1, dto2, dto3和vo。

其中dto2和dto3，巨人已经给我们了，就是interpret-dubbo2js已经带给我们的BillDetailyRequestDTO和BillDetailResponseDTO。

那么dto1和vo也作为燃料的一部分，如何获得呢？分为三种情况：

1. 全透传

即后端的出参与前端需要的数据结构完全相同，那么就无需vo，直接使用dto3即可，即在业务Service无需重载adapt函数。或者给后端的入参和来自前端的入参数据结构完全相同，那么无需dto1，直接使用dto2即可，即业务Service中无需重载prepare函数。

2. 半透传

实际大多数情况下是半透传的，就是一部分或者大部分字段是一样的，但是有一部分不一样。可能是需要新增字段，可能是字段名一样但是数据类型不一样。应对半透传我们引进**适配模式**。

[https://baike.baidu.com/item/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B9%8BADAPTER/14454359?fr=aladdin](https://baike.baidu.com/item/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B9%8BADAPTER/14454359?fr=aladdin)

使用类的继承，用java得到的类，适配出BFF需要的类。

3. 不透传

有时前端所需出参和从后端拿到的完全不同，没有可比性。我们就自己定义数据类型了。这种情况下工作量是最大的，不但要定义数据，还要在聚合过程中做数据转换。比如上文提到的5接口的例子就是这样的场景。

## 燃料充足，点火！
既然所有情况都考虑到了，就可以出配置文件了。读取配置文件自动生成代码。

上文提到的5接口聚合的业务配置文件如下：

```
{
  "type": "parrallel",
  "list": [{
    "type": "basic",
    "package": "com.oyo.product.service.client.ChannelServiceClient",
    "method": "allChannel"
  }, {
    "type": "basic",
    "package": "com.oyo.pms.service.hotelfunc.HotelFuncRpcService",
    "method": "getHotelFuncConfigWithHotelIds"
  }, {
    "type": "serial",
    "list": [{
      "type": "basic",
      "package": "com.oyo.product.service.client.RoomServiceClient",
      "method": "searchRoom",
      "service": "pager"
    }, {
      "type": "parrallel",
      "list": [{
        "type": "basic",
        "package": "com.oyo.hsm.api.service.IRoomStatusService",
        "method": "getRoomStatusByRoomIds"
      }, {
        "type": "basic",
        "package": "cn.oyo.trade.facade.service.IRoomReservationService'",
        "method": "getRoomReservationList"
      }]
    }]
  }],
  "combine": true,
  "dto0": "room/QueryFutureRoomStatusListDTO",
  "vo": "room/QueryFutureRoomStatusListVO"
}
```
上述配置文件包括了：反应堆结构，是否聚合，各铀235命名空间，方法，基类类型，是否需要dto0和vo等信息。然后，点火！
```
npm run fire
```
这套业务所需的绝大多数代码就生成了，就差最后的聚合函数了（卫星接轨）。
通常只需要一个聚合函数，就是总聚合。在Combine三参聚合函数中实现聚合逻辑即可。如果聚合逻辑复杂的话，可以新增一个工具文件，把聚合逻辑集中在工具函数中。

# 一些未来假说
## 合体假说
1. 如果BFF开发如同火箭版高效的话，那么前端和BFF能否合体成同一人呢？

对于BFF开发，精力消耗分配可能如下：

业务理解（20%）+ 与前端沟通（10%）+ 数据模型定义（10%）+ 与后端沟通（15%）+ 业务编码（30%） + 运维上线（15%）

对于前端开发，精力消耗分配可能如下：

业务理解（20%）+ 与BFF沟通（10%）+ 数据模型定义（10%）+ 业务编码（60%）

那么合体就具备三方面的天然优势：

1. 省去了一个人业务理解的精力。
2. 省去了前端与BFF端的沟通成本。
3. 前端和BFF实际是复用同一套Vo的。(h5的话)

于是如果合体的话，精力消耗如下：

业务理解（20%）+ 数据模型定义（10%）+ 与后端沟通（15%）+ BFF业务编码（30%） + 运维上线（15%）+ 前端业务编码（60%）= 150%

那么在Rocket工具下，BFF编码精力消耗将cut至10%

业务理解（20%）+ 数据模型定义（10%）+ 与后端沟通（15%）+ BFF业务编码（10%） + 运维上线（15%）+ 前端业务编码（60%）= 130%

所以还是负荷很高的。为了降低负荷，我们继续假设。

## 前端中心假说
既然前端励志要合体，就期待得到其他部门的支持。哪些部门呢？

1. 后端的支持。如果像上面的聚合5接口的例子，原来是一个BFF对5个后端，BFF要和不同的人沟通。精力消耗就会高达30%或更高。合体后期望得到后端的反向主动沟通。将前端在于后端的精力消耗cut至5%或更低。我们可以引进前端对后端的单向好评机制。前端可以对后端是否让自己进度顺利进行好评，如果某个后端让自己的业务开展不顺利，可以打差评。就像京东上买东西，买家可以单向地对商家进行好评和差评，商家不可以对买家好评。
2. 项目经理的支持。实质上对于反应堆组合的分析可以由项目经理来做。前端一共需要调哪些接口，是串行还是并行还是怎么组合的，每个接口分别找谁，完全可以由项目经理来整理清楚，这样前端在业务理解上的精力消耗可能cut至10%。
3. 运维的支持。实质上先前BFF的同学在运维发布时总是消耗了很多精力。经常在开发的时候是Ok的，发布出去就不好了，然后去排查，消耗精力。前端如果也可以对运维引进好评机制，会得到更积极对配合，减少精力消耗。

如果前端中心假说成立，那么精力消耗将cut至：

业务理解（10%）+ 数据模型定义（10%）+ 与后端沟通（5%）+ BFF业务编码（10%） + 运维上线（5%）+ 前端业务编码（60%）= 100%

