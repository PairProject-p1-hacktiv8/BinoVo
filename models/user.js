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
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
        msg : 'Kolom username tidak boleh kosong' ,
        },
        notEmpty:{
        msg : 'Kolom username tidak boleh kosong'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom password tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom password tidak boleh kosong'
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom role tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom role tidak boleh kosong'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom email tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom email tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hashingPassword(user.password)
    console.log(user.password);
  })
  return User;
};