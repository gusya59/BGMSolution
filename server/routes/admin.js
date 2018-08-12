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
  



module.exports = router;