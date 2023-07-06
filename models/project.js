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
    nameProject: DataTypes.STRING,
    minimumLoad: DataTypes.INTEGER,
    detail: DataTypes.TEXT,
    CompanyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};