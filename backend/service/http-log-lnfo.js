const statusCode = require('../utils/status-code')
const tables = require('../config/table-config/create-table.js')

const httpLogInfo = {
  async saveHttpLogInfo(ctx, logInfo) {
    try {
      await tables.tableInstance.HttpLogInfo.create(logInfo)
      ctx.response.status = 200
      ctx.body = statusCode.SUCCESS_200('success')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = httpLogInfo
