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
        notNull:{
          msg : 'Kolom name tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom name tidak boleh kosong'
        }
      }
    },
    balance: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom balance tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom balance tidak boleh kosong'
        }
      }
    },
    rank: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom rank tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom rank tidak boleh kosong'
        }
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom UserId tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom UserId tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Investor',
  });
  Investor.beforeCreate(investor => {
    investor.balance = 0
    investor.rank = 'bronze'
  })
  Investor.beforeUpdate(investor => {
    if(investor.balance >= 1_000_000_000) {
      investor.rank = 'Platinum'
    }else if(investor.balance >= 100_000_000){
      investor.rank = 'Gold'
    }
  })
  return Investor;
};