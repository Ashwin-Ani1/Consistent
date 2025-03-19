'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false, // First name cannot be null
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false, // Last name cannot be null
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false, // Date of birth cannot be null
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false, // City cannot be null
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false, // Country cannot be null
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Email must be unique
        validate: {
          isEmail: true, // Validate email format
        },
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false, // Phone number cannot be null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};