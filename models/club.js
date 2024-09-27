
const {
  Model
} = require('sequelize');
const sequelize = require('../config/database').sequelize;
const DataTypes = require('sequelize').DataTypes;
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  
  Club.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    timestamp: {
      type: DataTypes.STRING,
    },
    email_address: {
      type: DataTypes.STRING,
    },
    club_exists: {
      type: DataTypes.STRING,
    },
    club_name: {
      type: DataTypes.STRING,
    },
    leaders: {
      type: DataTypes.STRING,
    },
    advisor_name: {
      type: DataTypes.STRING,
    },
    advisor_email: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    goals: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    actions: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    committed_students: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    meeting_info: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    other_info: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Club',
  });

  return Club;
};