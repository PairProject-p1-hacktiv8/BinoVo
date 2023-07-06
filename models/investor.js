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
    nameInvestor: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    balance: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    rank: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'Investor',
  });
  return Investor;
};