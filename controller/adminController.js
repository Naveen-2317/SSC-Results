const admin = require('../models/adminSchema');
const studentData = require("../models/studentSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


async function adminRegistration(req, res) {
    let { adminName, email, password } = req.body;
    try {
        let existingAdmin = await admin.findOne({ email });
        if (existingAdmin) return res.render("adminRegister",{ message: "Admin already Exist" });
        let hashedPassword = await bcrypt.hash(password, 10);
        let newAdmin = await new admin({
            adminName,
            email,
            password: hashedPassword,
        });
        newAdmin.save();
        return res.status(201).render("adminRegister",{ message: "Admin registered successfully" });
        //return res.redirect('/api/student/allStudents');

    } catch (error) {
        return res.status(500).render("adminRegister",{ message: "Something Went Wrong" });
    }
}

async function adminLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Check for missing fields
        if (!email || !password) {
            return res.status(400).render("adminLogin", { message: "Email and password are required" });
        }

        // Check if admin exists
        const existAdmin = await admin.findOne({ email });
        if (!existAdmin) {
            return res.status(400).render("adminLogin", { message: "Invalid Email or Password" });
        }

        // Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, existAdmin.password);
        if (!isPasswordValid) {
            return res.status(400).render("adminLogin", { message: "Invalid Email or Password" });
        }

        // Create token
        const token = jwt.sign({ id: existAdmin._id }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
        });

        return res.redirect('/api/admin/allStudents');

        // return res.status(200).json({
        //     message: "Admin login successfully",
        //     token
        // });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).render("adminLogin",{ message: "Something went wrong" });
    }
}

async function postStudentData(req, res) {
    let { name, rollNo, marks } = req.body;

    try {
        let existStudent = await studentData.findOne({ rollNo: rollNo })
        console.log(existStudent);

        if (existStudent) {
            return res.render("addStudent",{ message: "User already Exist" });
        }

        const parseMarks = {
            telugu: parseInt(marks.telugu),
            english: parseInt(marks.english),
            hindi: parseInt(marks.hindi),
            science: parseInt(marks.science),
            social: parseInt(marks.social),
            maths: parseInt(marks.maths)
        }

        let total = Object.values(parseMarks).reduce((sum, value) => sum + value, 0);
        let newStudent = new studentData({
            name: name,
            rollNo: rollNo,
            marks: parseMarks,
            totalMarks: total
        })

        await newStudent.save();
        //return res.json({message : "Student added successfully"})
        return res.redirect('allStudents');
    } catch (error) {
        return res.status(500).render("addStudent",{ message: "Something went wrong" });
    }
};

async function updateStudentData(req, res) {
    let updateObj = {};
    // let { rollNo } = req.params;
    let { name, rollNo ,marks } = req.body;
    
    if (name) updateObj.name = name
    if (marks) {
        Object.keys(marks).forEach(subject => {
            updateObj[`marks.${subject}`] = parseInt(marks[subject]);
        });
    }
    try {
        await studentData.findOneAndUpdate({ rollNo: rollNo }, { $set: updateObj });
        return res.json({ message: "StudentData updated successfully" })
        //return res.redirect('/allStudents');

    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

async function deleteStudentData(req, res) {
    try {
        let { rollNo } = req.params;
        let a = await studentData.deleteOne({ rollNo });
        return res.json({ message: "Student delete Successfully" });
    } catch (error) {
        return res.json({ message: "Something went wrong" });
    }
}

async function allStudents(req, res) {
    try {
        let allStudents = await studentData.find({});
        return res.status(200).render('manage', { allStudents });
    } catch (error) {
        return res.json({ message: "Something went Wrong" });
    }
}

module.exports = {
    adminRegistration,
    adminLogin,
    postStudentData,
    updateStudentData,
    deleteStudentData,
    allStudents
}