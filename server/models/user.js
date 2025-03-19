'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, // First name cannot be null
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, // Last name cannot be null
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false, // Date of birth cannot be null
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false, // City cannot be null
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false, // Country cannot be null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Email must be unique
      validate: {
        isEmail: true, // Validate email format
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false, // Phone number cannot be null
    },
  });

  return User;
};