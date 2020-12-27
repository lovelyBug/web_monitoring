'use strict';
const baseInfo = require('../schema/baseInfo.js');
const getTableProperty = require('../schema/resourceLoadInfo.js');

module.exports = app => {
  const DataTypes = app.Sequelize;
  const { fields, fieldIndex } = getTableProperty(DataTypes);
  const User = app.model.define('resourceLoadInfo', { ...baseInfo(DataTypes), ...fields }, fieldIndex);

  return User;
};
