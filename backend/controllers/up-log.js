
const moment = require('moment')
const service = require('../service/index.js')

class UpLogController {
  static async index(ctx) {
    const logObj = ctx.query.info
    const logInfo = JSON.parse(decodeURIComponent(Buffer.from(logObj, 'base64').toString('utf-8')))
    // const logInfo = JSON.parse(logObj)
    if (logInfo.uploadType !== 'behaviorInfo') {
      // console.log(logInfo)
      logInfo.happenDate = moment(new Date(logInfo.happenTime)).format('YYYY-MM-DD HH:mm:ss')
      logInfo.happenDay = moment(new Date(logInfo.happenTime)).format('YYYY-MM-DD')
    }
    switch (logInfo.uploadType) {
      case 'behaviorInfo':
        service.behaviorInfo.saveBehaviorInfo(ctx, logInfo)
        break
      case 'resourceLoadInfo':
        service.resourceLoadInfo.saveResourceLoadInfo(ctx, logInfo)
        break
      case 'jsError':
        service.javascriptErrorInfo.saveJavascriptErrorInfo(ctx, logInfo)
        break
      case 'http_log':
        if (logInfo.status !== 200) {
          service.httpErrorInfo.saveHttpErrorInfo(ctx, logInfo)
        }
        service.httpLogInfo.saveHttpLogInfo(ctx, logInfo)
        break
      case 'pv':
        service.customerPV.saveCustomerPV(ctx, logInfo)
        break
      case 'leave':
        service.customerPvLeave.saveCustomerPvLeave(ctx, logInfo)
        service.customerStayTime.saveCustomerStayTime(ctx, logInfo)
        break
      default:
    }
    ctx.status = 200
  }
}

module.exports = UpLogController
