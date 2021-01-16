const baseInfo = require('./base-info');
const getTableProperty = require('../schema-con/customer-pv')
const CustomerPV = function (sequelize, DataTypes) {
  const { fields, fieldIndex } = getTableProperty(DataTypes)
  return sequelize.define('CustomerPV', {
    ...baseInfo(DataTypes),
    ...fields
  }, fieldIndex)

}
module.exports = CustomerPV