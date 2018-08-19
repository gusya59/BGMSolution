var valid = module.exports;

//first name validation -> checks if there any numbers or characters in the name
valid.validateFirstName = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("first name is empty");
      return false;
    }
    else {
      var reg = RegExp('^[A-Za-z]+$')  //only alphabet  to do something with length?
      if (!reg.test(data)) {
        errors.push("the first name is not right")
        return false;
      }
      return true
    }
  }
  //last name validation -> checks if there any numbers or characters in the name
  //שכפול קוד. לאחד לפונקציה אחת?
  valid.validateLastName = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("last name is empty");
      return false;
    }
    else {
      var reg = RegExp('^[A-Za-z]+$')  //only alphabet   to do something with length?
      if (!reg.test(data)) {
        errors.push("the last name is not right")
        return false;
      }
      return true
    }
  }
  //first name validation -> checks if there any numbers or characters in the name
  valid.validateEmail = function(errors, data) {
      console.log(data);
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("email is empty");
      return false;
    }
    else {
      //numbers, letters, @, characters
      var reg = RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$')
      if (!reg.test(data)) {
        console.log("here");
        errors.push("the email is not right")
        return false;
      }
      return true
    }
   
  }
  //validate password
  valid.validatePassword = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("last password is empty");
      return false;
    }
    else {
      var reg = RegExp('^(?=.*?[A-Z])(?=.*?[a-z]).{7,}([0-9])$')  //at least 8 characters, one upper and one lower case, numbers - ,{7,}->more than 8. it's counting from 0
      if (!reg.test(data)) {
        errors.push("the password is not right")
        return false;
      }
      return true
    }
  }
  //check if the data input is empty
  valid.isEmptyOrInvalid = function(str) {
    if (typeof str != "undefined" && str != null && str.length != null && str.length > 0) {
      return true;
    }
    return false;
  }
  //check if this a string - good for different functions
  valid.validateString = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("string is empty");
      return false;
    }
    else {
      var reg = RegExp('^([A-Za-z])(//s)+$')  //only alphabet   to do something with length?
      if (!reg.test(data)) {
        errors.push(reg + "the string is not right")
        return false;
      }
      return true
    }
  }
  valid.validateBusinessName = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("string is empty");
      return false;
    }
    else {
      var reg = RegExp('^(.)+$')  //any caharacter except new line
      if (!reg.test(data)) {
        errors.push("the business is not right")
        return false;
      }
      return true
    }
  }
  //mobile number validation
  valid.validateMobile = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("mobile is empty");
      return false;
    }
    else {
      var reg = RegExp('^([0-9]*)$')  //numbers
      if (!reg.test(data)) {
        errors.push("the mobile is not right")
        return false;
      }
      return true
    }
  }
  //phone number validation
  valid.validatePhone = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("phone is empty");
      return false;
    }
    else {
      var reg = RegExp('^([0-9]*)$')  //numbers, '-',
      if (!reg.test(data)) {
        errors.push("the phone is not right")
        return false;
      }
      return true
    }
  }
  //address validation
  valid.validateAddress = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("address is empty");
      return false;
    }
    else {
      var reg = RegExp('^([A-Z]*)(/.*)(/,*)(/s*)$')  //alphabet, '.', ',' ,whitespaces
      if (!reg.test(data)) {
        errors.push("the address is not right")
        return false;
      }
      return true
    }
  }
  //budget validation
  valid.validateBudget = function(errors, data) {
    if (!this.isEmptyOrInvalid(data)) {
      errors.push("budget is empty");
      return false;
    }
    else {
      var reg = RegExp('^([0-9]*)$')  //numbers
      if (!reg.test(data)) {
        errors.push("the budget is not right")
        return false;
      }
      return true
    }
  }