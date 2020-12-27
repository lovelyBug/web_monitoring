'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class BehaviorInfoService extends Service {
  constructor(ctx) {
    super(ctx);
    // 将用户的模型赋值在全局
    this.model = ctx.model.BehaviorInfo;
  }

  // async findOne(option) {
  //   const result = await this.model.findOne(option).then(res => {
  //     return res ? res.toJSON() : res;
  //   });
  //   return result;
  // }
  async saveBehaviorInfo(logInfo) {
    try {
      for (const behaviorInfo of logInfo.behaviorInfoList) {
        behaviorInfo.happenDate = moment(new Date(behaviorInfo.happenTime)).format('YYYY-MM-DD HH:mm:ss');
        await this.model.create(behaviorInfo);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = BehaviorInfoService;
