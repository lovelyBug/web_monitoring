const getTableProperty = require('../schema-con/extend-behavior-info')
const ExtendBehaviorInfo = function (sequelize, DataTypes) {
  const { fields, fieldIndex } = getTableProperty(DataTypes)
  return sequelize.define('ExtendBehaviorInfo', {
    ...fields
  }, fieldIndex)
}
module.exports = ExtendBehaviorInfo