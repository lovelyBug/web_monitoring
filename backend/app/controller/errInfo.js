'use strict';

const Controller = require('egg').Controller;

class ErrInfoController extends Controller {
  async getJsErrList() {
    const { ctx, service } = this;
    const errList = await service.javascriptErrorInfo.queryErrInfoList();
    ctx.body = {
      data: errList,
      code: 200
    }
  }
  async getJsErrorDetail() {
    const errId = this.ctx.request.query.errId;
    const errDetail = await this.service.javascriptErrorInfo.getErrorDetail(errId)
    this.ctx.body = {
      data: errDetail,
      code: 200
    }
  }
  async getJsErrInfoByDay() {
    const day = this.ctx.request.query.day;
    const errInfoList = await this.service.javascriptErrorInfo.getErrInfoByDay(day)
    this.ctx.body = {
      data: errInfoList,
      code: 200
    }
  }
  async getApiErrList() {
    const { ctx, service } = this;
    const errList = await service.httpErrorInfo.queryErrInfoList();
    ctx.body = {
      data: errList,
      code: 200
    }
  }
  async getApiErrorDetail() {
    const errId = this.ctx.request.query.errId;
    const errDetail = await this.service.httpErrorInfo.getErrorDetail(errId)
    this.ctx.body = {
      data: errDetail,
      code: 200
    }
  }
  async getApiErrInfoByDay() {
    const day = this.ctx.request.query.day;
    const errInfoList = await this.service.httpErrorInfo.getErrInfoByDay(day)
    this.ctx.body = {
      data: errInfoList,
      code: 200
    }
  }
  async getResourceErrList() {
    const { ctx, service } = this;
    const errList = await service.resourceLoadInfo.queryErrInfoList();
    ctx.body = {
      data: errList,
      code: 200
    }
  }
  async getResourceErrorDetail() {
    const errId = this.ctx.request.query.errId;
    const errDetail = await this.service.resourceLoadInfo.getErrorDetail(errId)
    this.ctx.body = {
      data: errDetail,
      code: 200
    }
  }
  async getResourceErrInfoByDay() {
    const day = this.ctx.request.query.day;
    const errInfoList = await this.service.resourceLoadInfo.getErrInfoByDay(day)
    this.ctx.body = {
      data: errInfoList,
      code: 200
    }
  }
}

module.exports = ErrInfoController;
