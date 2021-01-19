const statusCode = require('../utils/status-code')
const tables = require('../config/table-config/create-table.js')
const sendMail = require('../utils/send-mail.js')
const subject = 'JS报错'
const text = ''

const javascriptErrorInfo = {
  async saveJavascriptErrorInfo(ctx, logInfo) {
    try {
      const errList = await tables.tableInstance.JavascriptErrorInfo.create(logInfo)
      // 发送错误邮件
      const html = `<a href="http://localhost:8080/#/js_err/">${logInfo.errorMessage}</a>`
      sendMail(subject, text, html)
      ctx.status = 200
      ctx.body = statusCode.SUCCESS_200('success', errList)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = javascriptErrorInfo
