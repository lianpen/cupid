BFF端业务层开发需自上而下考虑如下问题，完成统一风格的编码。

请先了解BFF业务层理论基础。[https://shimo.im/docs/Zg3oxOR7gxF0Fyqv](https://shimo.im/docs/Zg3oxOR7gxF0Fyqv)

## 一. 接口如何组合？
如果只调一个接口，那么跳过这一步。

任何的组合形式，都可以总结为并行，串行，策略三种模式及三种模式的再高阶组合。

对于多接口组合，要使用响应速度最快的组合方式，优先并行。

用Combine函数将各接口最合理的组合起来。像下面这样：

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
优先在最外层Combine函数的三参统一实现聚合函数。这样思路更清晰。也可以根据实际情况在内部Combine函数及时聚合。
## 二. 数据结构是什么样的透传程度？
注意是数据结构的透传程度，不是最终数据的透传程度。比如money字段要把"5000"转换成"5,000"，加个逗号虽然值不一样了，但是类型还是都是字符串的，数据结构是透传的。另外比如money字段要把数字5000转换成字符串"5,000"，那么数据结构不是透传的。

如果数据接口是是全透传，那么无需自定义数据类型文件；如果数据结构是半透传的，那么自定义类型文件并继承java类型文件；如果数据结构不透传，那么自定义类型文件。

## 三. Service继承哪个基本类？
大多数情况继承BaseService。只需实现prepare,request,adapt三个阶段函数。

```
class HasFunctionService extends BaseService {
  prepare(dto: IQueryFutureRoomStatusListDTO): QueryHotelFuncConfigRequest {
    return new QueryHotelFuncConfigRequest({
      funcKey: "CHANGE_CHANNEL_ALIAS",
      hotelIds: [dto.hotelId]
    });
  }
  async request(
    dto: QueryHotelFuncConfigRequest
  ): Promise<HotelFuncConfigDTO[]> {
    const resp: IDubboResult<BaseResponse<
      Array<HotelFuncConfigDTO>
    >> = await DubboInterceptor(
      rpc.HotelFuncRpcService.getHotelFuncConfigWithHotelIds(dto)
    );
    return resp.res.data;
  }
  adapt() {}
}
```
一些特殊情况下，继承特殊的基本类。比如分页查全量场景继承PagerService，带缓存场景继承CacheService，等等。如果这种场景尚未被整理过，那么应该新增一个基本类。
## 四. 几组入参数据类型？
令前端入参数据类型为dto0

令BFF端入参数据类型为dto1

分为有0有1，有0没1，没0有1，没0没1 四种情况。

1. 完整情况下有0有1，两端都有数据类型，通过prepare函数转换。
2. 数据结构透传情况下，没0有1。无需定义前端数据类型。
3. 如果后端接口无需入参，或者入参都是Java.string,Java.number等基本数据类型，那么没有dto1。如果dto0也没有，那么就是后端服务无入参；如果有dto0，那么后端接口的基本类型是根据dto0计算出来的。
4. 只有在有0有1的情况下，才需要prepare函数。
5. 只有在有0没1的情况下，request函数的入参是dto0；其余情况下，request入参是dto1。
## 五. 是否需要BFF端出参数据类型？
如果后给BFF和BFF给前的数据结构完全相同，则无需BFF端vo。

## 六. 是否需要prepare函数？
1. 数据结构相同且完全透传，无需prepare函数。
2. 前端和BFF端只要有一端无数据类型，则无需prepare函数。
3. 其余需要。
## 七. 是否需要adapt函数？
有BFF端出参数据类型且需要适配，则需要adapt函数。

