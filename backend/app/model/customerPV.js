'use strict';
const baseInfo = require('../schema/baseInfo.js');
const getTableProperty = require('../schema/customerPV.js');

module.exports = app => {
  const DataTypes = app.Sequelize;
  const { fields, fieldIndex } = getTableProperty(DataTypes);
  const User = app.model.define('customerPV', { ...baseInfo(DataTypes), ...fields }, fieldIndex);

  return User;
};
