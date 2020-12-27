/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 静态服务位置
  config.static = {
    dir: path.resolve(appInfo.baseDir, '../frontend/webpack-sample/dist/'),

  };

  // config.security = {
  //   csrf: {
  //     enable: false,
  //   },
  // };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    // domainWhiteList: '*'
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // 定义前端错误日志
  config.customLogger = {
    frontendLogger: {
      file: path.join(appInfo.root, 'logs/frontend.log'),
    },
  };
  config.sequelize = {
    dialect: 'mysql', // 表示使用mysql
    host: '127.0.0.1', // 连接的数据库主机地址
    port: 3306, // mysql服务端口
    database: 'web_monitoring_test', // 数据库名
    username: 'root', // 数据库用户名
    password: 'clf18736952819', // 数据库密码
    define: { // model的全局配置
      timestamps: true, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: false, // 防止驼峰式字段被默认转为下划线
    },
    pool: {
      max: 500,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      charset: 'utf8mb4',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    logging: false
  };


  path.join(appInfo.baseDir, 'app/public');

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580737690789_267';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
