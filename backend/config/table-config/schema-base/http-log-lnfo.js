const baseInfo = require('./base-info');
const getTableProperty = require('../schema-con/http-log-lnfo')
const HttpLogInfo = function (sequelize, DataTypes) {
  const { fieldIndex, fields } = getTableProperty(DataTypes)
  return sequelize.define('HttpLogInfo', {
    ...baseInfo(DataTypes),
    ...fields
  }, fieldIndex)
}
module.exports = HttpLogInfo