const getTableProperty = require('../schema-con/customer-stay-time')
const CustomerStayTime = function (sequelize, DataTypes) {
  const { fields, fieldIndex } = getTableProperty(DataTypes)
  return sequelize.define('CustomerStayTime', {
    ...fields
  }, fieldIndex)

}
module.exports = CustomerStayTime