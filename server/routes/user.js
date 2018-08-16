var express = require('express');
var router = express();
var jwt = require('jsonwebtoken');

var registrationSchema = require('../models/Registration.js');
var verFuncs = require('../utils/verificationFunctions.js');

