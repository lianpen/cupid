# 单接口理论基础
应对一个简单的单接口进行的模型抽象。最简单基本的是BaseService类。

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

## 全透传，半透传与不透传
其中dto2和dto3是来自java得到的现成的。

那么dto1和vo如何获得呢？分为三种情况：

1. 全透传

即后端的出参与前端需要的数据结构完全相同，那么就无需vo，直接使用dto3即可，即在业务Service无需重载adapt函数。或者给后端的入参和来自前端的入参数据结构完全相同，那么无需dto1，直接使用dto2即可，即业务Service中无需重载prepare函数。

1. 半透传

实际大多数情况下是半透传的，就是一部分或者大部分字段是一样的，但是有一部分不一样。可能是需要新增字段，可能是字段名一样但是数据类型不一样。应对半透传我们引进**适配模式**。

[https://baike.baidu.com/item/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B9%8BADAPTER/14454359?fr=aladdin](https://baike.baidu.com/item/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E4%B9%8BADAPTER/14454359?fr=aladdin)

使用类的继承，用java得到的类，适配出BFF需要的类。

1. 不透传

有时前端所需出参和从后端拿到的完全不同，没有可比性。我们就自己定义数据类型了。这种情况下工作量是最大的，不但要定义数据，还要在聚合过程中做数据转换。

## 半透传下类的适配
继承形式如下：

```
export class BFFChinaTwoDetail extends ChinaTwoDetail {
  bill: string;
  account__BFF__: number;
  constructor(params: any) {
    super(params);
    this.adapt();
  }
  adapt() {}
}
```
1. BFF新增的字段用在子类定义
2. BFF和java共有但数据不同但字段，在BFF端加上__BFF__后缀。框架层会统一修复的。
## ## 抽象三阶段
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

# 接口组合理论基础
BFF可能需要组合多个数据来源的后端接口，最后组装成前端所需要的内容。

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

1. 串行模式

并行不能解决所有的场景。有时前一个请求得到的结果是后一个请求的入参条件。不知道前一个结果就不知道用啥请求后一个。可以若干个请求依次串行环环相扣。

1. 策略模式

有时会根据不用的入参条件请求不同的接口。或者前一个请求的接口会带来后续逻辑走向岔路。用策略模式来分发后续不同的服务走向。

## 模式高阶配置化
我们定义了组合类Combine。构造函数一参是组合类型（并行，串行还是策略），二参是单接口服务或其他组合列表，三参是聚合函数（可选）。

这是我刚解决的真实业务场景：一个BFF接口需要聚合5个后端接口做数据组装。分别是：

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
