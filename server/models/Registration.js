//Registartion (User DB) scheme and relevant functions
var mongoose = require('mongoose');
//var validate = require('mongoose-validator');
var bcrypt = require('bcrypt');

// Registration DB Schema --------->to add unique: true to the email later
var UsersSchema = mongoose.Schema({

  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, index: true, sparse: true },
  password: { type: String, required: true, trim: true },
  passwordConfirmation: { type: String, required: true, trim: true },
  termsConfirmCheck: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },  //true for admin, false for regular user
  ////
  business_name: { type: String,required: true, },
  business_type: { type: String,required: true, },
  mobile: { type: String,required: true, trim: true },
  phone: { type: String, trim: true },
  country: { type: String,required: true,},
  city: { type: String,required: true,},
  address: { type: String,required: true,},
  budget: { type: Number, required: true, trim: true },
  ////
  created: { type: Date, default: Date.now() }
});

var UsersSchemaExport = module.exports = mongoose.model('Users', UsersSchema);

//create user and hash it's password
module.exports.inputData = async function (newUser) {
  //hash and store the password in the DB
  var hashedPassword = await bcrypt.hash(newUser.password, 10).then(hashedPassword => {
    return hashedPassword
  });
  newUser.password = hashedPassword;
  var isMatched = await this.verifyPassword(newUser.passwordConfirmation, newUser.password);
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
    newUser.isAdmin = false;
    var promise = newUser.save().then(result => {
      return result;
    });
    return promise;
  }
  else {
    return isMatched;
  }
};

//input regestration data to the User database
//input:user data, eser's email that was extracted from the token
//output: true if succeded, else false
module.exports.userDataRegistration = async function (data, userEmail) {
  var update = await this.findByEmailAndUpdate(userEmail, { business_name: data.business_name });
  this.findByEmailAndUpdate(userEmail, { business_type: data.business_type });
  this.findByEmailAndUpdate(userEmail, { mobile: data.mobile });
  this.findByEmailAndUpdate(userEmail, { phone: data.phone });
  this.findByEmailAndUpdate(userEmail, { country: data.country });
  this.findByEmailAndUpdate(userEmail, { city: data.city });
  this.findByEmailAndUpdate(userEmail, { address: data.address });
  this.findByEmailAndUpdate(userEmail, { budget: data.budget });
  if (!update) {
    return false;
  }
  else {
    return update;
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

//find user by email
module.exports.isEmailExists = async function (email) {
  var userData = await UsersSchemaExport.findOne({ email: email })
  if (userData) {
    return true;
  }
  return false;
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
//input: object withusers email, old password, new password
//output: true on success, false otherwise
module.exports.changePassword = async function (data) {
  //find the user
  try {
    var userToUpdate = await this.findOne({ email: data.email });
    if (userToUpdate) {
      //hash the new password and update the db
      var passCheck = await this.verifyPassword(data.password, userToUpdate.password);
      if (true === passCheck) {
        var newPass = await bcrypt.hash(data.newPassword, 10);
        var updated = await this.findOneAndUpdate({ email: userToUpdate.email }, { $set: { password: newPass } });
        if (updated) { //if the user was updated
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    throw new Error('error')
  }
}


//find user in the db by it's email and check if the password that has been is correct
//input: email, password to check
//output: true if the password is correct' else false
module.exports.checkUserWithPassword = async function (userEmail, passTocheck) {
  //find the user
  try {
    var userToCheck = await this.findOne({ email: userEmail });
    if (userToCheck) {
      //hash the new password and check the db
      var passCheck = await this.verifyPassword(passTocheck, userToCheck.password);
      if (true === passCheck) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw new Error('error')
  }
}

//count the amount of admins
module.exports.countRegularUsers = async function () {
  var userData = await UsersSchemaExport.countDocuments({ isAdmin: 'false' }, function (err, countDocuments) {
    return countDocuments
  });
  return userData;
}

//count the amount of regular users
module.exports.countAdminUsers = async function () {
  var userData = await UsersSchemaExport.countDocuments({ isAdmin: 'true' }, function (err, count) {
    return count;
  });
  return userData;
}
//find all users with specific type of permission :regular or admin
//input: permision: true for admin, false for regular
//output: object with all relevant users
module.exports.findAllByPermission = async function (data) {
  var userData = await UsersSchemaExport.find({ isAdmin: data })
  return userData;
}

//delete specific user.
//input: email of the user
//output: removed object if succeded, null if not
module.exports.deleteUser = async function (data) {
  var removed = await UsersSchemaExport.findOneAndDelete({ email: data })
  return removed;
}