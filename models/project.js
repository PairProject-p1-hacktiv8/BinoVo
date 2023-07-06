'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.Company)
      Project.hasMany(models.ProjectInvestor)
      // define association here
    }
  }
  Project.init({
    nameProject: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom nameProject tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom nameProject tidak boleh kosong'
        }
      }
    },
    minimumLoad: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom minimum load tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom minimum load tidak boleh kosong'
        }
      }
    },
    detail: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom detail tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom detail tidak boleh kosong'
        }
      }
    },
    CompanyId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom companyId tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom companyId tidak boleh kosong'
        }
      }
    },imageURL: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg : 'Kolom minimum load tidak boleh kosong' ,
        },
        notEmpty:{
          msg : 'Kolom minimum load tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};