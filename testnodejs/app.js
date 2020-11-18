var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require("cors")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const {mongoose} = require ('./db.js')
const usersRouter = require("./routes/users");

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 ,
    methods: "GET, PUT ,POST , DELETE"
}

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api",usersRouter)

app.listen(3000,()=>console.log("listenning port 3000"))


module.exports = app;
