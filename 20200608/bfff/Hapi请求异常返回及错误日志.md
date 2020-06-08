# 主流程
![图片](https://uploader.shimo.im/f/kIjaFTLh4sAwG161.png!thumbnail)

# 请求前拦截
# 响应前拦截
todo...

成功返回200 带data

错误返回错误码和message

```
  if (!response['isBoom']) {
    const responseObject: ResponseObject = response as ResponseObject;
    ret = getSuccessResult(responseObject);
  } else {
    const boom: Boom = response as Boom;
    ret = getBoomResult(boom, request);
  }
```
# 异常处理列表
todo..

## 令牌
取request的header accessToken

## 权限
## 路由
## 服务内部抛错
空对象引用举例：

```
[2019-11-29T16:47:39.677] [ERROR] default - Error: BFF服务内部程序异常 Cannot read property 'b' of undefined TypeError: Cannot read property 'b' of undefined
    at base_1.Combine (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/services/vas/getProfit.js:45:27)
    at Service.<anonymous> (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/services/base/service/Service.js:87:44)
    at Generator.next (<anonymous>)
    at fulfilled (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/services/base/service/Service.js:5:58)
    at process._tickCallback (internal/process/next_tick.js:68:7)
    at Function.<anonymous> (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/services/base/service/Service.js:64:28)
    at Generator.throw (<anonymous>)
    at rejected (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/services/base/service/Service.js:6:65)
    at process._tickCallback (internal/process/next_tick.js:68:7)
Error
    at Object.error (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/framework/log4js/index.js:23:19)
    at getBoomResult (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/framework/hapi/preResponseExt.js:70:29)
    at /Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/framework/hapi/preResponseExt.js:43:19
    at Generator.next (<anonymous>)
    at /Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/framework/hapi/preResponseExt.js:11:71
    at new Promise (<anonymous>)
    at __awaiter (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/framework/hapi/preResponseExt.js:7:12)
    at preResponseExt (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/dist/framework/hapi/preResponseExt.js:30:12)
    at module.exports.internals.Manager.execute (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/node_modules/hapi/lib/toolkit.js:31:106)
    at Request._invoke (/Users/oyo01613/Desktop/lianpen2007/ops-biz-node/node_modules/hapi/lib/request.js:339:55)
```
## 后端超时
分为超时警告和超时放弃

5秒后每秒抛超时警告

```
后端服务严重超时 已挂起13秒 服务名： com.oyo.report.api.service.ReportRpcService.queryOrderSourceReport
后端服务严重超时 已挂起14秒 服务名： com.oyo.report.api.service.ReportRpcService.queryOrderSourceReport
后端服务严重超时 已挂起15秒 服务名： com.oyo.report.api.service.ReportRpcService.queryOrderSourceReport
后端服务严重超时 已挂起16秒 服务名： com.oyo.report.api.service.ReportRpcService.queryOrderSourceReport
```
如30秒内返回 记录超时警告

```
[2019-11-29T16:47:39.283] [ERROR] default - 后端服务严重超时 响应时间为16179毫秒 服务名： com.oyo.dataquery.client.facade.PLBFacadeService.queryPLBInfo
```
如30秒还未返回 确定超时 记录日志

```
[2019-11-29T16:47:39.283] [ERROR] default - 后端服务严重超时 超过30秒未响应  服务名： com.oyo.dataquery.client.facade.PLBFacadeService.queryPLBInfo
```
## 出参校验
