const baseInfo = require('./base-info');
const getTableProperty = require('../schema-con/http-error-info')
const HttpErrorInfo = function (sequelize, DataTypes) {
  const { fields, fieldIndex } = getTableProperty(DataTypes)
  return sequelize.define('HttpErrorInfo', {
    ...baseInfo(DataTypes),
    ...fields
  }, fieldIndex)
}
module.exports = HttpErrorInfo