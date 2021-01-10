const db = require('../config/db')
const Sequelize = db.sequelize;

const BehaviorInfo = Sequelize.import('../schema_temp/behaviorInfo');

const CustomerPV = Sequelize.import('../schema_temp/customerPV');

const CustomerPvLeave = Sequelize.import('../schema_temp/CustomerPvLeave');

const CustomerStayTime = Sequelize.import('../schema_temp/CustomerStayTime');

const ExtendBehaviorInfo = Sequelize.import('../schema_temp/extendBehaviorInfo');

const HttpErrorInfo = Sequelize.import('../schema_temp/HttpErrorInfo');

const HttpLogInfo = Sequelize.import('../schema_temp/HttpLogInfo');

const JavascriptErrorInfo = Sequelize.import('../schema_temp/javascriptErrorInfo');

const LocationPoints = Sequelize.import('../schema_temp/locationPoints');

const LoadPageInfo = Sequelize.import('../schema_temp/loadPageInfo');

const ResourceLoadInfo = Sequelize.import('../schema_temp/resourceLoadInfo');

const ScreenShotInfo = Sequelize.import('../schema_temp/ScreenShotInfo');

const VideosInfo = Sequelize.import('../schema_temp/videosInfo');

module.exports = {
  BehaviorInfo,
  CustomerPV,
  CustomerPvLeave,
  CustomerStayTime,
  ExtendBehaviorInfo,
  HttpErrorInfo,
  HttpLogInfo,
  JavascriptErrorInfo,
  LocationPoints,
  LoadPageInfo,
  ResourceLoadInfo,
  ScreenShotInfo,
  VideosInfo
}
