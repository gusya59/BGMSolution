var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var registrationSchema = require('../models/Registration.js');
var verFuncs = require('../utils/verificationFunctions.js');

 //fetch user's data. the function get's user token, fetching an email and a user permission and searching for the user data in the db.
 //input: token
 //outpit: object with user's data on success, else false message
 router.post('/profile',verFuncs.getTokenFromHeaders, async function (req, res) {
    var verifyToken = verFuncs.verifyToken(req.token, jwt);
    
    //this a regular user. it will return false
    //check if the loken valid and if the user has admin permissions
    if(verifyToken){
        var check =verFuncs.decodeisAdmin(req.token, jwt);
        if(!check){
             console.log("jbdfjb");
            var userEmail = verFuncs.decodeUserEmail(req.token, jwt);
            var userdata = await registrationSchema.findByEmail(userEmail);
            if(userdata){
            console.log(userdata);
            res.status(200).send({ success: true, message: "success", userdata: userdata});
            }
            else{
            res.status(200).send({ success: false, message: "there is no such user"});
            } 
        }
        res.status(200).send({ success: false, message: "it is an admin user"});
    }
      res.status(200).send({ success: false, message: "session is expired" })
    });
    

    module.exports = router;