
const statusCode = require('../utils/status-code')
const db = require('../config/db.js')
const Sequelize = db.sequelize;
const { QueryTypes } = require('sequelize')
const moment = require('moment');

class JavascriptErrorInfoController {
  static async getJsErrListByHour(ctx) {
    try {
      const date = ctx.query.day
      if(date === undefined) {
        ctx.response.status = 400;
        ctx.body = statusCode.ERROR_400('请添参数：day')
        return
      }
      // const date = moment(new Date()).format()
      const tableName = 'JavascriptErrorInfo'
      const sql = `SELECT DATE_FORMAT(happenDate,'%H') AS time, COUNT(*) AS counts FROM ${tableName} GROUP BY time ORDER BY time`
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
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('success', errHourList)
    } catch(e) {
      console.log(e)
    }
  }
  static async getJSErrInfoByHour(ctx) {
    try {
      const hour = ctx.query.hour
      if(hour === undefined) {
        ctx.response.status = 400;
        ctx.body = statusCode.ERROR_400('请添参数：hour')
        return
      }
      const day = moment(new Date()).format('yy-MM-DD')
      const startTime = `${day} ${hour}:00:00`
      const endTime = `${day} ${hour}:59:59`
      const sql = `SELECT errorMessage, COUNT(deviceName = 'pc' or null) as pcNum, COUNT(deviceName = 'android' or null) as androidNum, COUNT(deviceName = 'ios' or null) as iosNum, COUNT(DISTINCT userId) as userNum FROM JavascriptErrorInfo WHERE happenDate BETWEEN '${startTime}' and '${endTime}' group by errorMessage`
      let errDetail = await Sequelize.query(sql, { type: QueryTypes.SELECT })
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('success', errDetail)
    } catch(e) {
      console.log(e)
    }
  }
  static async getJsErrInfoByType(ctx) {
    try {
      const errorMessage = ctx.query.errorMessage
      if(errorMessage === undefined) {
        ctx.response.status = 400;
        ctx.body = statusCode.ERROR_400('请添参数：errorMessage')
        return
      }
      const sql = `SELECT * FROM JavascriptErrorInfo WHERE errorMessage='${errorMessage}'`
      const errDetail = await Sequelize.query(sql, { type: QueryTypes.SELECT })
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('success', errDetail)
    } catch(e) {
      console.log(e)
    }
  }
  static async getJsErrInfoByID(ctx) {
    try {
      const id = ctx.query.id
      if(id === undefined) {
        ctx.response.status = 400;
        ctx.body = statusCode.ERROR_400('id')
        return
      }
      const sql = `SELECT * FROM JavascriptErrorInfo WHERE id='${id}'`
      const errDetail = await Sequelize.query(sql, { type: QueryTypes.SELECT })
      ctx.response.status = 200;
      ctx.body = statusCode.SUCCESS_200('success', errDetail[0])
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = JavascriptErrorInfoController
