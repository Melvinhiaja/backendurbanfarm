'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    otp: DataTypes.STRING,
    otpExpiresAT: {
      type: DataTypes.DATE,
      field: 'otp_expiry',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }, status: {
      type: DataTypes.STRING,
      defaultValue: 'inactive'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
