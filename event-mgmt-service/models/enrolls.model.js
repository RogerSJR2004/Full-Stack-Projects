const { DataTypes, Sequelize } = require('sequelize');

module.exports = (eventDB) => {
  const Enrolls = eventDB.define('enrolls',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      full_name: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      email_address: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      district: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: true
      },
      meta_1: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      meta_2: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      meta_3: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      created_by: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_by: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      updatedAt: false,
      createdAt: false,
      timestamps: false,
      underscored: false,
    });

  return Enrolls;
};
