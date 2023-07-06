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
        notNull:true,
        notEmpty:true
      }
    },
    minimumLoad: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    detail: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    },
    CompanyId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:true,
        notEmpty:true
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};