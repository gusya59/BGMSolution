var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var registrationSchema = require('../models/Registration.js');
var QuestionSchema = require('../models/Question')
var verFuncs = require('../utils/verificationFunctions.js')

//registration
router.post('/info',verFuncs.getTokenFromHeaders, async function (req, res) {
  console.log("the input is: " + req.body);
  var verifyToken = verFuncs.verifyToken(req.token, jwt);
  var check =verFuncs.decodeisAdmin(req.token, jwt);
  //check if the loken valid and if the user has admin permissions
  if(verifyToken && check){
      //the amount of regular users
    var regUserAmount = await registrationSchema.countRegularUsers();
    console.log("the regular user's amount is "+regUserAmount);
    //the amount of admin users
    var adminUserAmount = await registrationSchema.countAdminUsers();
    console.log("the admin user's amount is "+adminUserAmount);
    res.status(200).send({ success: true, regUserAmount: regUserAmount, adminUserAmount: adminUserAmount }) 
  }
 
    res.status(200).send({ success: false, message: "session is expired" })
  });
  
 //find user by permission. token verification
 //input: token, permission type: true for admin, false for regular user
 //outpit: object with all the relevant users
  router.post('/admins',verFuncs.getTokenFromHeaders, async function (req, res) {
    var verifyToken = verFuncs.verifyToken(req.token, jwt);
    if(verifyToken){
      //find all users with specific permissions.
      var adminUsers = await registrationSchema.findAllByPermission(req.body.isAdminPer);
      console.log(adminUsers);
      res.status(200).send({ success: true,adminUsers: adminUsers}) 
    }
    else{
      res.status(200).send({ success: false, message: "session is expired" })
    }

    });

  //delete user.
  //input: email of the user that need to be deleted
  //output: true on success, else false
  router.post('/admins/remove', async function (req, res) {
    console.log("the input is: " + req.body.email);
    var deleteUser = await registrationSchema.deleteUser(req.body.email);
    if(deleteUser){
      res.status(200).send({ success: true, message: "user removed"});
    }
    else{
      res.status(200).send({ success: false, message: "user wasn't removed"});
    } 
  });

    //change permissions. will be used for /admins and for /users routes
    //input: email in order to find the user in the db, permission type: true for admin, false for regular user
    //output: true on success, else false
    router.post('/admins/changePermissions', async function (req, res) {
      var updatedUser = await registrationSchema.findByEmailAndUpdate(req.body.email,{isAdmin:req.body.isAdminPer});
      if(updatedUser){
        res.status(200).send({ success: true, message: "user permission changed"});
      }
      else{
        res.status(200).send({ success: false, message: "error "});
      } 
    });

    // router.post('/addQuestion', async function (req,res){
    //   var newQuestion =new QuestionSchema(req.body);
    //   var result = await QuestionSchema.createQuestion(newQuestion);
    //   console.log(result);
    // });

    //fetching user info from the db
    //input: user's email
    //output: on success: object with user's info, else false
    router.post('/users/info', async function (req, res) {
      var userdata = await registrationSchema.findByEmail(req.body.email);
      if(userdata){
        console.log(userdata);
        res.status(200).send({ success: true, message: "success", userdata: userdata});
      }
      else{
        res.status(200).send({ success: false, message: "there is no such user"});
      } 
    });



module.exports = router;