const express = require("express");
const route = express.Router();
const adminController = require('../controller/adminController');
const { verifyAuth } = require('../middlewares/auth');
const multer = require('multer');
const upload = multer();

route.post('/register',adminController.adminRegistration);
route.post('/login',adminController.adminLogin);
route.post('/addStudent',verifyAuth,adminController.postStudentData);
route.patch('/updateStudent/:rollNo',verifyAuth,upload.none(),adminController.updateStudentData);
route.delete('/deleteStudent/:rollNo',verifyAuth,adminController.deleteStudentData);
route.get('/allStudents',verifyAuth,adminController.allStudents);


module.exports = route;