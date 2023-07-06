'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.belongsTo(models.User)
      Company.hasMany(models.Project)
      // define association here
    }
  }
  Company.init({
    nameCompany: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom nameCompany tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom nameCompany tidak boleh kosong'
        }
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom address tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom address tidak boleh kosong'
        }
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom userId tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom userId tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};