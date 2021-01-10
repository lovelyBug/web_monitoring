const InfoCountByHour = function (sequelize, DataTypes) {
  return sequelize.define('InfoCountByDay', {
    // ID 主键
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 日志类型
    uploadType: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'uploadType'
    },
    // 监控ID
    webMonitorId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      field: 'webMonitorId'
    },
    // 每天的名称 2019-06-28
    dayName: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'dayName'
    },
    // 每天的数量
    dayCount: {
      type: DataTypes.FLOAT(20),
      allowNull: true,
      field: 'dayCount'
    },
  }, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true,
    indexes: [
      {
        name: "webMonitorIdIndex",
        method: "BTREE",
        fields: [
          {
            attribute: "webMonitorId"
          },
          {
            attribute: "uploadType"
          }
        ]
      }
    ]
  })

}
//exports//
module.exports = InfoCountByHour
//exports//