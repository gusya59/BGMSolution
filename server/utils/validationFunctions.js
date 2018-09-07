//-------------------------------All the validation functions------------------------------------//
var valid = module.exports;

//validation for first and last name
//input: an array that will contain errors if found, data to check 
//output: true on success, else false
valid.validateName = function (errors, data) {
  if (!this.isEmptyOrInvalid(data)) { //check if the string is empty or invalid
    errors.push("first or last name is empty");
    return false;
  } else {
    var reg = RegExp('([a-zA-Z\s\'\-])$')  //allow only an alphabet, ', -, whitespaces
    if (!reg.test(data)) {
      errors.push("the first or last name is invalid")
      return false;
    }
    return true
  }
}

////email validation
//input: an array that will contain errors if found, data to check 
//output: true on success, else false
valid.validateEmail = function (errors, data) {
  console.log(data);
  if (!this.isEmptyOrInvalid(data)) { //check if the string is empty or invalid
    errors.push("email is empty");
    return false;
  } else {
    //numbers, letters, @, characters
    var reg = RegExp('([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$') //allows only an alphabet,numbers, ., -, _. need to have @. domain have to be between 2 and 6 characters
    if (!reg.test(data)) {
      errors.push("the email is invalid")
      return false;
    }
    return true
  }
}

//validate password
//input: an array that will contain errors if found, data to check 
//output: true on success, else false
valid.validatePassword = function (errors, data) {
  if (!this.isEmptyOrInvalid(data)) {
    errors.push("last password is empty"); //check if the string is empty or invalid
    return false;
  } else {
    var reg = RegExp('^(?=.*?[A-Z])(?=.*?[a-z]).{7,}([0-9])$')  //at least 8 characters, one upper and one lower case, numbers - ,{7,}->more than 8. it's counting from 0
    if (!reg.test(data)) {
      errors.push("the password is not right")
      return false;
    }
    return true
  }
}

//check if the string is empty
//input: string
//output: true on success, else false
valid.isEmptyOrInvalid = function (str) {
  if (typeof str != "undefined" && str != null && str.length != null && str.length > 0 && !(str === undefined) && str !== "undefind") {
    return true;
  }
  return false;
}

//mobile number validation
//input: an array that will contain errors if found, data to check 
//output: true on success, else false
valid.validatePhone = function (errors, data) {
  if (!this.isEmptyOrInvalid(data)) { //check if the string is empty or invalid
    errors.push("mobile is empty");
    return false;
  } else {
    var reg = RegExp('([0-9]*)$')  //numbers
    if (!reg.test(data)) {
      errors.push("the mobile or phone is not right")
      return false;
    }
    return true
  }
}

//budget validation
//input: an array that will contain errors if found, data to check 
//output: true on success, else false
valid.validateBudget = function (errors, data) {
  if (!this.isEmptyOrInvalid(data)) { //check if the string is empty or invalid
    errors.push("budget is empty");
    return false;
  } else {
    var reg = RegExp('^([0-9]*)$')  //numbers and . for decimal
    if (!reg.test(data)) {
      errors.push("the budget is not right")
      return false;
    }
    return true
  }
}

