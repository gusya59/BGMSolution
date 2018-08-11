//Registartion (User DB) scheme and relevant functions
var mongoose = require('mongoose');
//var validate = require('mongoose-validator');
var bcrypt = require('bcrypt');

// Registration DB Schema --------->to add unique: true to the email later
var UsersSchema = mongoose.Schema({

  firstName: { type: String, required: true, trim:true },
  lastName: { type: String, required: true, trim:true },
  email: { type: String, required: true, trim: true, index: true, sparse: true },
  password: { type: String, required: true, trim:true },
  passwordConfirmation: { type: String, required: true, trim:true },
  termsConfirmCheck: { type: Boolean, required: true },
  ////
  business_name: { type: String, required: true },
  business_type: { type: String, required: true },
  mobile: { type: String, required: true, trim:true },
  phone: { type: String, required: true, trim:true },
  country: { type: String, required: true},
  address: { type: String, required: true },
  budget: { type: Number, required: true, trim:true },
  created: { type: Date, default: Date.now() }
});

var UsersSchemaExport = module.exports = mongoose.model('Users', UsersSchema);

//create user and hash it's password
module.exports.inputData = async function (newUser) {
  //console.log("the user is: " + newUser);
  //hash and store the password in the DB
  var hashedPassword = await bcrypt.hash(newUser.password, 10).then(hashedPassword => {
    return hashedPassword
  });
  newUser.password = hashedPassword;
  //console.log("hashed password: " + newUser.password);
  var isMatched = await this.verifyPassword(newUser.passwordConfirmation, newUser.password);
  //console.log("is matched? " +isMatched);
  if (isMatched) {
    //
    newUser.passwordConfirmation = hashedPassword;
    newUser.business_name = "true";
    newUser.business_type = "true";
    newUser.mobile = "000";
    newUser.phone = "000";
    newUser.country = "true";
    newUser.city = "true";
    newUser.address = "true";
    newUser.budget = "0";
    var promise = newUser.save().then(result => {
      // console.log("the result is: " + result);
      return result;
    });
    return promise;
  }
  else {
    return isMatched;
  }
};

module.exports.userDataRegistration = async function (data) {

  var update = await this.findByEmailAndUpdate(data.email, { business_name: data.business_name });
  this.findByEmailAndUpdate(data.email, { business_type: data.business_type });
  this.findByEmailAndUpdate(data.email, { mobile: data.mobile });
  this.findByEmailAndUpdate(data.email, { phone: data.phone });
  this.findByEmailAndUpdate(data.email, { country: data.country });
  this.findByEmailAndUpdate(data.email, { city: data.city });
  this.findByEmailAndUpdate(data.email, { address: data.address });
  this.findByEmailAndUpdate(data.email, { budget: data.budget });
  if (!update) {
    console.log("db wasn't updated");
    return false;
  }
  else {
    return true;
  }
}

//find specific user by email and update data
module.exports.findByEmailAndUpdate = async function (email, updateData) {
  var ans = await UsersSchemaExport.findOneAndUpdate({ email: email }, updateData, { new: true })
  return ans;
}

//find user by email
module.exports.findByEmail = async function (email) {
  var userData = await UsersSchemaExport.findOne({ email: email })
  return userData;
}

//find user by first name
module.exports.findByFirstName = async function (name) {
  var userData = await UsersSchemaExport.findOne({ firstName: name })
  return userData;
}
//find user by last name
module.exports.findByLastName = async function (name) {
  var userData = await UsersSchemaExport.findOne({ lastName: name })
  return userData;
}
//verify the password
module.exports.verifyPassword = async function (pass, hash) {  //(pass to verify, pass)
  var res = await bcrypt.compare(pass, hash)
  return res;
}

//change user password
module.exports.changePassword = async function (data) {
  //do we need this one?
}