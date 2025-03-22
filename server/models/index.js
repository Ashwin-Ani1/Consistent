const mongoose = require('mongoose');
const userModel = require('./user');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  User: userModel,
};