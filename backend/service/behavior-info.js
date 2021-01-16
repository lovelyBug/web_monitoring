const moment = require('moment')
const statusCode = require('../utils/status-code')
const tables = require('../config/table-config/create-table.js')

const behaviorInfo = {
  async saveBehaviorInfo(ctx, logInfo) {
    try {
      for (const behaviorInfo of logInfo.behaviorInfoList) {
        behaviorInfo.happenDate = moment(new Date(behaviorInfo.happenTime)).format('YYYY-MM-DD HH:mm:ss')
        await tables.tableInstance.BehaviorInfo.create(behaviorInfo)
      }
      ctx.response.status = 200
      ctx.body = statusCode.SUCCESS_200('success')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = behaviorInfo
