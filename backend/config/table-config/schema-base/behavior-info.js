const baseInfo = require('./base-info');
const getTableProperty = require('../schema-con/behavior-info')
const BehaviorInfo = function (sequelize, DataTypes) {
  const { fields, fieldIndex } = getTableProperty(DataTypes)
  return sequelize.define('BehaviorInfo', {
    ...baseInfo(DataTypes),
    ...fields
  }, fieldIndex)

}
module.exports = BehaviorInfo