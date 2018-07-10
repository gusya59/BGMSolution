var mongoose = require('mongoose');

// Registration DB Table
var UsersSchema = mongoose.Schema({
  firstName: {type: String, required: true, unique: true},
  lastName: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  passwordConfirmation: {type: String, required: true},
  created:{type: Date, deafult:Date.now()}
});

module.exports = mongoose.model('Users', UsersSchema);