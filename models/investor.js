'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Investor.belongsTo(models.User)
      Investor.hasMany(models.ProjectInvestor)
      // define association here
    }
  }
  Investor.init({
    nameInvestor: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    rank: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investor',
  });
  return Investor;
};