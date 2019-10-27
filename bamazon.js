// import mysql and inquirer modules
var mysql = require('mysql');
var inquirer = require('inquirer');

// create object for connecting to mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

// connect to bamazon database
connection.connect(function(err){
    if (err) throw err;
    console.log('Connection successful!')
});


