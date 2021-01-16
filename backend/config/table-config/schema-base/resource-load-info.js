const baseInfo = require('./base-info');
const getTableProperty = require('../schema-con/resource-load-info')
const ResourceLoadInfo = function (sequelize, DataTypes) {
  const { fieldIndex, fields } = getTableProperty(DataTypes)
  return sequelize.define('ResourceLoadInfo', {
    ...baseInfo(DataTypes),
    ...fields
  }, fieldIndex)
}
module.exports = ResourceLoadInfo