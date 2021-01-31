
const statusCode = require('../utils/status-code')
const db = require('../config/db.js')
const Sequelize = db.sequelize
const { QueryTypes } = require('sequelize')


class UserLogController {
  static async getUserLog(ctx) {
    try {
      const userId = ctx.query.userId
      if(userId === undefined) {
        ctx.status = 400
        ctx.body = statusCode.ERROR_400('userId')
        return
      }
      const behaviorInfoSql = `SELECT id, uploadType, happenTime, happenDate, completeUrl, behaviorType, className, tagName, innerText from BehaviorInfo WHERE userId='${userId}'`
      const httpLogInfoSql = `SELECT id, uploadType, happenTime, happenDate, completeUrl, httpUrl, loadTime, status, statusText, statusResult from HttpLogInfo WHERE userId='${userId}'`
      const jsErrInfoSql = `SELECT id, uploadType, happenTime, happenDate, completeUrl, deviceName, os, browserName, errorMessage from JavascriptErrorInfo WHERE userId='${userId}'`

      const behaviorInfo = await Sequelize.query(behaviorInfoSql, { type: QueryTypes.SELECT })
      const httpLogInfo = await Sequelize.query(httpLogInfoSql, { type: QueryTypes.SELECT })
      const jsErrInfo = await Sequelize.query(jsErrInfoSql, { type: QueryTypes.SELECT })

      httpLogInfo.map(item => {
        item.loadTime = Math.round(item.loadTime)
      })
      const data = [...behaviorInfo, ...httpLogInfo, ...jsErrInfo].sort((a, b) => a.happenTime - b.happenTime)
      ctx.status = 200
      ctx.body = statusCode.SUCCESS_200('success', data)
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = UserLogController
