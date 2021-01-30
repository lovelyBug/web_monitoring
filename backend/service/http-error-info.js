const statusCode = require('../utils/status-code')
const tables = require('../config/table-config/create-table.js')
const sendMail = require('../utils/send-mail.js')
const subject = 'API报错'
const text = ''

const httpErrorInfo = {
  async saveHttpErrorInfo(ctx, logInfo) {
    try {
      const errList = await tables.tableInstance.HttpErrorInfo.create(logInfo)
      if(logInfo.statusResult === '请求返回') sendHttpErrEmail(logInfo)
      ctx.status = 200
      ctx.body = statusCode.SUCCESS_200('success', errList)
    } catch (e) {
      console.log(e)
    }
  }
}
function sendHttpErrEmail(logInfo) {
  const {httpUrl, loadTime, status, responseText, happenDate} = logInfo
  const html = `
    <div>接口地址：${httpUrl}</div>
    <div>耗时：${loadTime}ms</div>
    <div>状态码：${status}</div>
    <div>状态描述：${responseText}</div>
    <div>发生时间：${happenDate}</div>
    <div><a href="http://localhost:8080/#/api_err/">点击查看详情</a></div>
  `
  sendMail(subject, text, html)
}

module.exports = httpErrorInfo
