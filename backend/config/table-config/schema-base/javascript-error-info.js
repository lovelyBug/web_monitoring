const baseInfo = require('./base-info');
const getTableProperty = require('../schema-con/javascript-error-info')
const JavascriptErrorInfo = function (sequelize, DataTypes) {
  const { fieldIndex, fields } = getTableProperty(DataTypes)
  return sequelize.define('JavascriptErrorInfo', {
    ...baseInfo(DataTypes),
    ...fields
  }, fieldIndex)
}
module.exports = JavascriptErrorInfo