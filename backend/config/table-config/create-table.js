
const db = require('../db.js')
const Sequelize = db.sequelize
const { DataTypes } = require('sequelize');


const tables = {
  // table实例对象
  tableInstance: {},
  // 创建table
  createTable: function() {
    const BehaviorInfo = require('./schema-base/behavior-info.js')(Sequelize, DataTypes)
    BehaviorInfo.sync({force: false})
    
    const CustomerPV = require('./schema-base/customer-pv.js')(Sequelize, DataTypes)
    CustomerPV.sync({force: false})

    const CustomerPvLeave = require('./schema-base/custome-pv-leave.js')(Sequelize, DataTypes)
    CustomerPvLeave.sync({force: false})

    const CustomerStayTime = require('./schema-base/customer-stay-time.js')(Sequelize, DataTypes)
    CustomerStayTime.sync({force: false})
    
    const ExtendBehaviorInfo = require('./schema-base/extend-behavior-info.js')(Sequelize, DataTypes)
    ExtendBehaviorInfo.sync({force: false})
    
    const HttpErrorInfo = require('./schema-base/http-error-info.js')(Sequelize, DataTypes)
    HttpErrorInfo.sync({force: false})
    
    const HttpLogInfo = require('./schema-base/http-log-lnfo.js')(Sequelize, DataTypes)
    HttpLogInfo.sync({force: false})
    
    const JavascriptErrorInfo = require('./schema-base/javascript-error-info.js')(Sequelize, DataTypes)
    JavascriptErrorInfo.sync({force: false})
    
    const LoadPageInfo = require('./schema-base/load-page-info.js')(Sequelize, DataTypes)
    LoadPageInfo.sync({force: false})
    
    const ResourceLoadInfo = require('./schema-base/resource-load-info.js')(Sequelize, DataTypes)
    ResourceLoadInfo.sync({force: false})
    this.tableInstance = {
      BehaviorInfo,
      CustomerPV,
      CustomerPvLeave,
      CustomerStayTime,
      ExtendBehaviorInfo,
      HttpErrorInfo,
      HttpLogInfo,
      JavascriptErrorInfo,
      LoadPageInfo,
      ResourceLoadInfo,
    }
  }
}

module.exports = tables
