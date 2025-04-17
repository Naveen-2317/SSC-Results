const express = require('express');
const route = express.Router();
const studentData = require("../models/studentSchema");

route.get("/",(req,res)=>{
    res.render('home');
});

route.get('/add',(req,res)=>{
    res.render('addStudent');
})

route.get('/update/:rollNo',async(req,res)=>{
    let rollNo = req.params.rollNo;
    let student = await studentData.findOne({rollNo});
    res.render('updateStudent',{student});
})

route.get('/register',(req,res)=>{
    res.render('adminRegister');
})

route.get('/login',(req,res)=>{
    res.render('adminLogin');
});

route.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
  });

module.exports = route;