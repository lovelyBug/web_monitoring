const statusCode = require('../utils/status-code')
const tables = require('../config/table-config/create-table.js')

const customerPV = {
  async saveCustomerPV(ctx, logInfo) {
    try {
      await tables.tableInstance.CustomerPV.create(logInfo)
      ctx.response.status = 200
      ctx.body = statusCode.SUCCESS_200('success')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = customerPV
