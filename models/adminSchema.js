const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    adminName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model("admin",adminSchema);