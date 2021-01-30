
const statusCode = require('../utils/status-code')
const db = require('../config/db.js')
const Sequelize = db.sequelize
const { QueryTypes } = require('sequelize')
const moment = require('moment')
const tableName = 'HttpLogInfo'


class HttpLogInfoController {
  static async getApiLogListByHour(ctx) {
    try {
      const date = ctx.query.day
      if(date === undefined) {
        ctx.status = 400
        ctx.body = statusCode.ERROR_400('请添参数：day')
        return
      }
      const startTime = `${date} 00:00:00`
      const endTime = `${date} 23:59:59`
      const sql = `SELECT DATE_FORMAT(happenDate,'%H') AS time, AVG(loadTime) as counts FROM ${tableName} WHERE happenDate BETWEEN '${startTime}' and '${endTime}' and statusResult = '请求返回' GROUP BY time ORDER BY time`
      let errHourList = await Sequelize.query(sql, { type: QueryTypes.SELECT })
      const map = {}
      errHourList.forEach(item => {
        map[+item.time] = true
      })
      for(let i = 0; i < 24; i++) {
        if(!map[i]) {
          errHourList.push(
            {
              time: i < 10 ? `0${i}` : `${i}`,
              counts: 0
            }
          )
        }
      }
      errHourList = errHourList.sort((a, b) => (a.time) - (b.time)).map(item => {
        item.counts = +item.counts
        return item
      })
      ctx.status = 200
      ctx.body = statusCode.SUCCESS_200('success', errHourList)
    } catch(e) {
      console.log(e)
    }
  }
  static async getApiLogInfoByHour(ctx) {
    try {
      const hour = ctx.query.hour
      if(hour === undefined) {
        ctx.status = 400
        ctx.body = statusCode.ERROR_400('请添参数：hour')
        return
      }
      const day = moment(new Date()).format('yy-MM-DD')
      const startTime = `${day} ${hour}:00:00`
      const endTime = `${day} ${hour}:59:59`
      const sql = `SELECT httpUrl, AVG(loadTime) as loadTime, COUNT(httpUrl) as num, COUNT(DISTINCT userId) as userNum FROM ${tableName} WHERE happenDate BETWEEN '${startTime}' and '${endTime}' and statusResult = '请求返回' GROUP BY httpUrl`
      let errDetail = await Sequelize.query(sql, { type: QueryTypes.SELECT })
      errDetail.map(item => {
        item.loadTime = Math.round(item.loadTime)
      })
      ctx.status = 200
      ctx.body = statusCode.SUCCESS_200('success', errDetail)
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = HttpLogInfoController
