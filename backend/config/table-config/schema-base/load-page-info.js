const baseInfo = require('./base-info');
const getTableProperty = require('../schema-con/load-page-info')
const LoadPageInfo = function (sequelize, DataTypes) {
  const {fieldIndex, fields} = getTableProperty(DataTypes)
  return sequelize.define('LoadPageInfo', {
    ...baseInfo(DataTypes),
    ...fields
  }, fieldIndex)
}
module.exports = LoadPageInfo 