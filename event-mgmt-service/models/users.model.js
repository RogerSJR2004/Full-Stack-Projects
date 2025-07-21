const { DataTypes } = require('sequelize');

module.exports = (eventDB) => {
  const Users = eventDB.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    occupation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address_line_1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address_line_2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    updatedAt: false,
    createdAt: false,
    timestamps: false,
    underscored: false,
  });

  return Users;
};
