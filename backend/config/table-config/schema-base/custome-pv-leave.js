const getTableProperty = require('../schema-con/custome-pv-leave')
const CustomerPvLeave = function (sequelize, DataTypes) {
  const { fields, fieldIndex } = getTableProperty(DataTypes)
  return sequelize.define('CustomerPvLeave', {
    ...fields
  }, fieldIndex)

}
module.exports = CustomerPvLeave