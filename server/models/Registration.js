var mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');  


// Registration DB Schema --------->to add unique: true later
var UsersSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, trim: true, index: true, sparse: true, validate:[validate({
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
  //console.log(newUser);

  //hast and store a password in the DB
  var hashedPassword = await bcrypt.hash(newUser.password, 10).then(hashedPassword=>{
    return hashedPassword
  });
  newUser.password=hashedPassword;
  console.log("hashed password: "+newUser.password);

  var promise = newUser.save().then(result =>{
    console.log("the result is: " +result);
    if (result)
      return true;
    return false;
  });
  return promise;
};


  //verify the password
  module.exports.verifyPassword = function (pass){
    bcrypt.compare(pass, 10, function(err,res){
      if (res){
        console.log("password match");
      }else
      console.log("passwords don't match" + err);
    })
    return result;
}

  //find user by email
  module.exports.findByEmail = async function (email){
    var userData = await UsersSchemaExport.findOne({email: email})
    return userData;
  }
 