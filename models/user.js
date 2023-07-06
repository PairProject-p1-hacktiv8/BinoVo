'use strict';
const { hashingPassword } = require('../helpers')
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
      User.hasOne(models.Company)
      User.hasOne(models.Investor)
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    hashingPassword(user.password)
    .then(hassed => {
      user.password = hassed
    })
    .catch(err => {
      console.log(err, 'error hasing password');
    })
  })
  return User;
};