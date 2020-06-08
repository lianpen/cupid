Rocket是一个BFF端代码自动生成工具。

具体立项细节：

[https://shimo.im/docs/dOq5MjpmmvidFDql](https://shimo.im/docs/dOq5MjpmmvidFDql)

理论基础与模式设计：

[https://shimo.im/docs/Zg3oxOR7gxF0Fyqv](https://shimo.im/docs/Zg3oxOR7gxF0Fyqv)

业务思路整理：

[https://shimo.im/docs/DJAz4bgnoYTMFeqy](https://shimo.im/docs/DJAz4bgnoYTMFeqy)

# 总体使用流程
## 一. 安装依赖
```
npm i @oyo/rocket --save-dev
```
## 二. 配置json参数文件
默认配置文件挂在项目根目录下rocket.json

也可以自定义配置文件挂在rocketJson目录下

## 三. 执行npm命令
```
npm run fire
```
如果是自定义的配置文件，需命令参数上指定配置文件路径：
```
npm run fire test/simple.json
```
# rocket.json配置文件举例
## 单接口
```
{
  "package": "com.oyo.pms.service.hotelfunc.HotelFuncRpcService",
  "method": "getHotelFuncConfigWithHotelIds",
  "target": "rocket/simple"
}
```
## 双接口
```
{
  "type": "parrallel",
  "dto": "room/QueryFutureRoomStatusListDTO",
  "vo": "room/QueryFutureRoomStatusListVO",
  "target": "rocket/parrallel",
  "list": [
    {
      "package": "com.oyo.product.service.client.ChannelServiceClient",
      "method": "allChannel"
    },
    {
      "package": "com.oyo.pms.service.hotelfunc.HotelFuncRpcService",
      "method": "getHotelFuncConfigWithHotelIds"
    }
  ]
}
```
## 多接口多模式混合
```
{
  "type": "parrallel",
  "dto": "room/QueryFutureRoomStatusListDTO",
  "vo": "room/QueryFutureRoomStatusListVO",
  "target": "rocket/combined",
  "list": [
    {
      "package": "com.oyo.product.service.client.ChannelServiceClient",
      "method": "allChannel"
    },
    {
      "package": "com.oyo.pms.service.hotelfunc.HotelFuncRpcService",
      "method": "getHotelFuncConfigWithHotelIds"
    },
    {
      "type": "serial",
      "list": [
        {
          "package": "com.oyo.product.service.client.RoomServiceClient",
          "method": "searchRoom"
        },
        {
          "type": "parrallel",
          "list": [
            {
              "package": "com.oyo.hsm.api.service.IRoomStatusService",
              "method": "getRoomStatusByRoomIds"
            },
            {
              "package": "com/oyo/hsm/api/IRoomReservationService",
              "method": "getRoomReservationList"
            }
          ]
        }
      ]
    }
  ]
}
```
# 参数
rocket.json文件参数说明：

## 根配置
| 名称 | 描述 | 类型 | 是否必填 | 举例 | 
|:----:|:----:|:----:|:----:|:----|:----:|
| target | 目标生成文件目录以及文件名 | string | 是 | rocket/combined  将基于rocket文件夹生成combined文件 | 

## 服务级参数
| 名称   | 描述   | 类型   | 是否必填   | 举例   | 
|:----|:----|:----|:----|:----|:----:|
| package   | 后端服务命名空间。路径可用/或.来分割   | string   | 是   | com.oyo.hsm.api.service.IRoomStatusService  或  com/oyo/hsm/api/IRoomReservationService     | 
| method   | 后端服务函数   | string   | 是   | getRoomReservationList     | 

## 组合级参数
| 名称 | 描述 | 类型 | 是否必填 | 举例 | 
|:----:|:----|:----:|:----:|:----:|:----|:----:|
| type | 组合类型 可填parrallel（并行）  serial (串行）  stragety(策略）  也可填1，2，3表示串行并行或策略   | string | 是 | parrallel或  1   | 
| list   | 该组合下的服务列表  列表的每一项是上面的服务级参数   | array   | 是   | []   | 


## 服务级和组合级公用参数
| 名称 | 描述 | 类型 | 是否必填 | 举例 | 
|:----:|:----|:----:|:----:|:----|:----:|
| dto | 上级链路入参数据类型这个类型一定是bff端定义的，所以一定在src/types目录下   | string | 否 | room/QueryFutureRoomStatusListDTO     | 
| vo   | 下级链路出参数据类型  这个类型一定是bff端定义的，所以一定在src/types目录下   | string    | 否   | room/QueryFutureRoomStatusListVO     | 

# 情景差异
## 单服务还是多服务？
单服务直接配置package和method

多服务配置type和list

## 几组入参？
令前端入参数据类型为dto0

令BFF端入参数据类型为dto1

分为有0有1，有0没1，没0有1，没0没1 四种情况。

1. 完整情况下有0有1，两端都有数据类型，通过prepare函数转换。
2. 数据结构透传情况下，没0有1。无需定义前端数据类型。
3. 如果后端接口无需入参，或者入参都是Java.string,Java.number等基本数据类型，那么没有dto1。如果dto0也没有，那么就是后端服务无入参；如果有dto0，那么后端接口的基本类型是根据dto0计算出来的。
4. 只有在有0有1的情况下，才需要prepare函数。
5. 只有在有0没1的情况下，request函数的入参是dto0；其余情况下，request入参是dto1。

在需要dto0的时候，配置dto路径。

## 是否有BFF端出参？
如果后给BFF和BFF给前的数据结构完全相同，则无需配置vo。

如果数据结构有任何不同，则配置vo。

# 生成规则
## 总体规则
rocket会对每一次命令生成文件controller, service, mock, unitTest各一个。type文件根据情况若干个。

生成目录和文件名是由参数target指定的。

rocket不生成适配函数和聚合函数的具体内容。

适配函数和聚合函数的具体内容是需要自行开发的。

### service导出
单服务下导出一个实例化service的get

```
export default async function(request: Request): Promise<any> {
  const dto: QueryHotelFuncConfigRequest = new QueryHotelFuncConfigRequest(request.payload as any);
  return await new GetHotelFuncConfigWithHotelIdsService().get(dto);
}
```
多服务下导出一个Facade的get
```
export default async function (request: Request): Promise<any> {
  const combine: ICombine = new Combine(COMBINE_TYPE.PARRALLEL,
    [
      AllChannelService,
      GetHotelFuncConfigWithHotelIdsService,
    ],
    (dtoList: Array<any>, dtoStack: Array<any>): any => {
      return null;
    }
  );
  const dto: IQueryFutureRoomStatusListDTO = new QueryFutureRoomStatusListDTO(request.payload as any);
  return await new Facade(combine).get(dto);
}
```
在controller调用service的方式都是一样的，都是直接调函数
```
import service from '../../services/rocket/extraImport';      
const result: ICompanyVo = await service(request);
```
## 服务级规则
### 服务类名
函数名默认为method参数指定的后端接口函数名+Service 大写。

如method = getHotelFuncConfigWithHotelIds

则className=GetHotelFuncConfigWithHotelIdService

### prepare函数
如果后端服务函数没有指针类型的入参，或服务没有指定dto。两者满足其一则不产生prepare函数。

prepare函数生成内容仅对出参做简单申明和实例化，具体适配由业务自行实现

```
    prepare(dto: IQueryFutureRoomStatusListDTO): QueryHotelFuncConfigRequest {
      const ret: QueryHotelFuncConfigRequest = new QueryHotelFuncConfigRequest({});
      return ret;
    }
```
### request函数
request函数是一定会生成的，且生成完以后绝大多数情况是无需再修改的。

目前只发现一种需要修改的情况：在rpc定义这个命名空间的时候使用了别名。（todo..)

```
    async request(dto: BillInfoSummaryRequestDTO): Promise<BillInfoSummaryResponseDTO> {
      const resp: IDubboResult<BaseResponse<BillInfoSummaryResponseDTO>> = await this.fetch(
        rpc.IHotelBillService.queryBillList(dto)
      );
      return resp.res.data;
    }
```
### adapt函数
如果服务或组合定义了vo，则生成adapt函数，否则不生成。

adapt函数生成内容仅对vo做简单申明和实例化，具体适配由业务自行实现。

```
    adapt(dto: BillInfoSummaryResponseDTO): IBillSummaryVo {
      const ret: IBillSummaryVo = new BillSummaryVo({});
      return ret;
    }
```
## 组合级规则
如果业务有服务组合，则service文件顶端将获得形如下面的代码，表示组合关系。

```
export default async function (request: Request): Promise<any> {
  const combine: ICombine = new Combine(COMBINE_TYPE.PARRALLEL,
    [
      AllChannelService,
      GetHotelFuncConfigWithHotelIdsService,
      new Combine(COMBINE_TYPE.SERIAL,
        [
          SearchRoomService,
          new Combine(COMBINE_TYPE.PARRALLEL,
            [
              GetRoomStatusByRoomIdsService,
              GetRoomReservationListService,
            ],
          )
        ],
      )
    ],
    (dtoList: Array<any>, dtoStack: Array<any>): any => {
      return null;
    }
  );
  const dto: IQueryFutureRoomStatusListDTO = new QueryFutureRoomStatusListDTO(request.payload as any);
  return await new Facade(combine).get(dto);
}
```
### 聚合函数
任何一个Combine构造函数的三参都可以是一个聚合函数。

如果组合类型是并行的，并且组合定义了vo，那么会生成聚合函数，否则不生成。

聚合内容是业务层自行实现的。一参是带结构的链路数据，二参是拍平以后的链路数据。

```
    (dtoList: Array<any>, dtoStack: Array<any>): any => {
      return null;
    }
```
### 自动出入参类型设定
在组合模式下，就算配置文件没有指定dto和vo，rocket也会自动根据组合逻辑默认参数类型。

```
  /**
   * 自动匹配复杂结构对应的dto
   * 1. 并行情况下 组合的dto0是所有服务的dto0
   * 2. 串行情况下
   *    第一个服务的dto0是组合的dto0 其余服务的dto0是上一个服务的responseVo
   *    最后一个服务的vo是组合的vo
   */
```
