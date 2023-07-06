'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectInvestor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectInvestor.belongsTo(models.Project)
      ProjectInvestor.belongsTo(models.Investor)
      // define association here
    }
  }
  ProjectInvestor.init({
    InvestorId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER,
    load: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProjectInvestor',
  });
  return ProjectInvestor;
};