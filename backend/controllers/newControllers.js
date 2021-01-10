
const statusCode = require('../util/status-code')
const { BehaviorInfo } = require('../modules/index.js')

class Common {
  static async test(ctx) {
    const res = await BehaviorInfo.findAll()
    ctx.response.status = 200;
    ctx.body = statusCode.SUCCESS_200('success', res)
  }
}

module.exports = Common
