const express = require('express');
const route = express.Router();
const studentController = require("../controller/studentController");

route.get('/results',studentController.results);

module.exports = route;