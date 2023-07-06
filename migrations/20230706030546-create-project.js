'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameProject: {
        type: Sequelize.STRING
      },
      minimumLoad: {
        type: Sequelize.INTEGER
      },
      detail: {
        type: Sequelize.TEXT
      },
      CompanyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Companies',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Projects');
  }
};