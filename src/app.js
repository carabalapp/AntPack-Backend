const express = require('express');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const usersRoutes = require('./routes/users');
const port = (process.env.port || 3000)
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'antpack'
}, 'single'))

app.listen(port, (error)=>{
    if(error){
        console.log('Error in server:' +error);
    }else{
        console.log('server run on port ', port);
    }
})

app.use('/user', usersRoutes)