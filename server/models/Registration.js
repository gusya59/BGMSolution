var mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');  


// Registration DB Schema
var UsersSchema = mongoose.Schema({
  firstName: {type: String, required: true, unique: true},
  lastName: {type: String, required: true, unique: true},
  email: {type: String, required: true, trim: true, index: true, unique: true, sparse: true, validate:[validate({
    validator: 'isEmail',
    message: 'Not a valid email.',
    }),]},
  password: {type: String, required: true},
  passwordConfirmation: {type: String, required: true},
  created:{type: Date, deafult:Date.now()}
});



var UsersSchemaExport = module.exports = mongoose.model('Users', UsersSchema);

//create user and hash it's password
module.exports.inputData = async function(newUser){
  //hash password
  var newPassword = await bcrypt.hash(newUser.password, 10, function(err, hash) {
    return newPassword;
  });
  //store the password in DB
  newUser.password=newPassword;
  var promise = newUser.save().then(result =>{
    if (result)
      return true;
    return false;
  })
  return promise;
}

  //verify the password
  module.exports.verifyPassword = async function (pass, hash){
    var check =  bcrypt.compare(pass, hash, function(err, res) {
      if(res) {
        console.log("the password is ok");
       return true;
      } else {
       console.log("password don't match");
       return false;
      }
      return check;
  })
}

  //find user by email
  module.exports.findByEmail = async function (email){
    var userData = await UsersSchemaExport.findOne({email: email})
    return userData;
  }
 