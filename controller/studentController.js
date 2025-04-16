const studentData = require("../models/studentSchema");

async function results(req, res) {
    let { name, rollNo } = req.query;

    try {
        let studentResult = await studentData.findOne({ name, rollNo });
        if (!studentResult) return res.render('home',{message :"Enter Valid Details"});
        //return res.json({results : studentResult})
        return res.render('results',{results : studentResult});
    } catch (error) {
        return res.status(500).render("results",{ message: "Something went wrong" });
    }
}

module.exports = {
    results
}