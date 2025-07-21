const { DataTypes } = require('sequelize');

module.exports = (eventDB) => {
  const Enrolls = eventDB.define('enrolls', {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    // Add any other enrollment-specific fields here
  }, {
    updatedAt: false,
    createdAt: false,
    timestamps: false,
    underscored: false,
  });

  return Enrolls;
};
