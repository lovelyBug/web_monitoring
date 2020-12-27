'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');
// moment.locale('zh-cn')

class UpLogController extends Controller {
  async index() {
    const { ctx } = this;
    const logInfo = ctx.request.query.info;
    const logObj = JSON.parse(decodeURIComponent(Buffer.from(logInfo, 'base64').toString('utf-8')));
    if (logObj.uploadType !== 'behaviorInfo') {
      // console.log(logObj)
      logObj.happenDate = moment(new Date(logObj.happenTime)).format('YYYY-MM-DD HH:mm:ss');
      logObj.happenDay = moment(new Date(logObj.happenTime)).format('YYYY-MM-DD');
    }
    switch (logObj.uploadType) {
      case 'behaviorInfo':
        this.service.behaviorInfo.saveBehaviorInfo(logObj);
        break
      case 'resourceLoadInfo':
        this.service.resourceLoadInfo.saveResourceLoadInfo(logObj);
        break
      case 'jsError':
        this.service.javascriptErrorInfo.saveJavascriptErrorInfo(logObj);
        break
      case 'http_log':
        if (logObj.status !== 200) {
          this.service.httpErrorInfo.saveHttpErrorInfo(logObj);
        }
        this.service.httpLogInfo.saveHttpLogInfo(logObj);
        break
      case 'pv':
        this.service.customerPV.saveCustomerPV(logObj);
        break
      case 'leave':
        this.service.customerPvLeave.saveCustomerPvLeave(logObj);
        this.service.customerStayTime.saveCustomerStayTime(logObj);
        break
      default:
    }
    // ctx.set('Content-Type', 'application/json')
    ctx.body = {
      code: 200,
    };
  }
}

module.exports = UpLogController;
