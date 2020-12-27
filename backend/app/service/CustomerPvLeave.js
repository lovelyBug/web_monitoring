'use strict';

const Service = require('egg').Service;

class CustomerPvLeave extends Service {
  constructor(ctx) {
    super(ctx);
    // 将用户的模型赋值在全局
    this.model = ctx.model.CustomerPvLeave;
  }

  // async findOne(option) {
  //   const result = await this.model.findOne(option).then(res => {
  //     return res ? res.toJSON() : res;
  //   });
  //   return result;
  // }
  async saveCustomerPvLeave(logInfo) {
    try {
      await this.model.create(logInfo);
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = CustomerPvLeave;
