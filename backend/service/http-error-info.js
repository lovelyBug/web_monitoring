const statusCode = require('../utils/status-code')
const tables = require('../config/table-config/create-table.js')

const httpErrorInfo = {
  async saveHttpErrorInfo(ctx, logInfo) {
    try {
      const errList = await tables.tableInstance.HttpErrorInfo.create(logInfo)
      ctx.response.status = 200
      ctx.body = statusCode.SUCCESS_200('success', errList)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = httpErrorInfo
