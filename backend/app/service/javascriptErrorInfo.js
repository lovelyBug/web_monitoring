'use strict';

const Service = require('egg').Service;

class JavascriptErrorInfo extends Service {
  constructor(ctx) {
    super(ctx);
    // 将用户的模型赋值在全局
    this.model = ctx.model.JavascriptErrorInfo;
  }

  async saveJavascriptErrorInfo(logInfo) {
    try {
      await this.model.create(logInfo);
    } catch (e) {
      console.log(e);
    }
  }
  async getErrorDetail(errId) {
    try {
      const errDetail = await this.model.findOne({ where: { id: errId } });
      return errDetail
    } catch (e) {
      console.log(e);
    }
  }
  async getErrInfoByDay(day) {
    try {
      const errInfoList = await this.model.findAll({ where: { happenDay: day } });
      return errInfoList
    } catch (e) {
      console.log(e);
    }
  }
  async queryErrInfoList() {
    try {
      const { fn, col } = this.app.model
      const { Op } = this.app.Sequelize
      const errList = await this.model.findAll(
        {
          attributes: [
            'happenDay',
            [ fn('COUNT', col('happenDay')), 'count' ],
          ],
          where: {
            happenDate: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
            }
          },

          group: 'happenDay',
          raw: false
        }
      );
      return errList
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = JavascriptErrorInfo;
