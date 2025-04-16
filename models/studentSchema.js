const mongoose = require("mongoose");

const studentDataSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rollNo : {
        type : Number,
        required : true,
        unique : true
    },
    marks: {
        telugu: { type: Number, required: true, min: 0, max: 100 },
        hindi: { type: Number, required: true, min: 0, max: 100 },
        english: { type: Number, required: true, min: 0, max: 100 },
        maths: { type: Number, required: true, min: 0, max: 100 },
        science: { type: Number, required: true, min: 0, max: 100 },
        social: { type: Number, required: true, min: 0, max: 100 }
    },
    totalMarks: Number,
},{timestamps : true});

module.exports = mongoose.model("studentData",studentDataSchema);