'use strict';
const baseInfo = require('../schema/baseInfo.js');
const getTableProperty = require('../schema/HttpLogInfo.js');

module.exports = app => {
  const DataTypes = app.Sequelize;
  const { fields, fieldIndex } = getTableProperty(DataTypes);
  const User = app.model.define('HttpLogInfo', { ...baseInfo(DataTypes), ...fields }, fieldIndex);

  return User;
};
