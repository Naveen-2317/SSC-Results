const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes.js');
const studentRoute = require('./routes/studentRoutes.js');
const staticRoutes = require('./routes/staticRoutes.js');
const connectDB = require('./configs/dbConnection.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
connectDB();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use('/',staticRoutes);
app.use('/api/student',studentRoute);
app.use('/api/admin',adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server started at PORT ${PORT}`);  
})