var express = require('express');
var router = express();
var expressJwt = require('express-jwt');

var registrationSchema = require('../models/Registration.js');


//registration
router.post('/', async function (req, res) {
    console.log("the input is: " + req.body);

    //the amount of regular users
    var regUserAmount = await registrationSchema.countRegularUsers();
      console.log("the regular user's amount is "+regUserAmount);
    //the amount of admin users
    var adminUserAmount = await registrationSchema.countAdminUsers();
    console.log("the admin user's amount is "+adminUserAmount);
    res.status(200).send({ success: false, regUserAmount: regUserAmount, adminUserAmount: adminUserAmount }) 
  });
  

  router.post('/admins', async function (req, res) {
    console.log("the input is: " + req.body);

    //the amount of regular users
    var regUserAmount = await registrationSchema.countRegularUsers();
    //the amount of admin users
    var adminUserAmount = await registrationSchema.countAdminUsers();
    //find all users with admin permissions
    var adminUsers = await registrationSchema.findAllByPermission(true);
    console.log(adminUsers);
    res.status(200).send({ success: true, regUserAmount: regUserAmount, adminUserAmount: adminUserAmount, adminUsers: adminUsers}) 
  });

  //delete user
  router.post('/admins/remove', async function (req, res) {
    console.log("the input is: " + req.body);
    var deleteUser = await registrationSchema.deleteUser(req.user);
    if(deleteUser){
      res.status(200).send({ success: true, message: "user removed"});
    }
    else{
      res.status(200).send({ success: false, message: "user wasn't removed"});
    }
    
  });



module.exports = router;