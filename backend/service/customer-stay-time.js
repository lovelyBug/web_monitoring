const statusCode = require('../utils/status-code')
const tables = require('../config/table-config/create-table.js')

const customerStayTime = {
  async saveCustomerStayTime(ctx, logInfo) {
    try {
      await tables.tableInstance.CustomerStayTime.create(logInfo)
      ctx.status = 200
      ctx.body = statusCode.SUCCESS_200('success')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = customerStayTime
