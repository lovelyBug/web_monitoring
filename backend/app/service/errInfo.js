'use strict';

const Service = require('egg').Service;

class ErrInfo extends Service {
  constructor(ctx) {
    super(ctx);
    // 将用户的模型赋值在全局
    this.model = ctx.model.ErrInfo;
  }

  async queryErrInfoList() {
    try {
      const errList = await this.model.findAll();
      this.ctx.body = errList
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = ErrInfo;
