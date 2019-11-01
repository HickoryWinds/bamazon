// bamazonCustomer allows a customer to purchase an item after viewing a list of available items.
// If a sufficient number of items are available in inventory, the customer's purchase is completed
// and the number of items and total cost are displayed. If there is not sufficient inventory,
// a message is shown. In both instances the customer is taken back to the start screen.

// import mysql and inquirer modules
var mysql = require('mysql');
var inquirer = require('inquirer');

// tableLength store length of products table to check if user
//inputs
var tableLength;

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
});

// function listIt show the user all the items in inventory, asks for purchasing information,
// checks inventory then informs user if purchase made or cannot be completed
function listIt(){
    // display all contents of bamazon database products table
    var query = 'SELECT * FROM products;'
    connection.query(query, function(err, results){
        // store tableLength for id validity check
        tableLength = results.length;
        // if error occurs, show error message
        if (err) throw err;
        // display inventory
        for (var i = 0; i < results.length; i++) {
            console.log('id: ' + results[i].id + ' || Product Name: ' + results[i].product_name +
            ' || Department Name: ' + results[i].department_name + ' || Price: ' + results[i].price.toFixed(2) +
            ' || Stock Quantity: ' + results[i].stock_quantity);
        }
        console.log('\n');
        runPurchase();
    });
}

// function start asks user what they would like to do
function start() {
    inquirer.prompt({
        name: 'startIt',
        type: 'rawlist',
        message: 'What would you like to do [BUY] or [EXIT]?',
        choices: ['BUY', 'EXIT']
    }).then(function(answer){
        if (answer.startIt === 'BUY'){
            listIt();
        } else {
            connection.end();
        }
    })
}


// function run Purchase get the id and quantity the buyer would like to purchase then
// completes purchase if sufficient inventory in stock. If purchase completed, then
// stock level is updated.
function runPurchase(){
    inquirer.prompt([
        {
        name: 'itemId',
        type: 'input',
        message: 'What is the id of the item you would like to purchase?'
    }, {
        name: 'quantity',
        type: 'input',
        message: 'How many of this item would you like to buy?'

    }
    ]).then(function(answer){
        var query = 'SELECT * FROM products WHERE ?;';
        // check is user entered valid product id
        if(tableLength < answer.itemId) {
            console.log('Invalid Id number.\n');
            start();
        } else {
            connection.query(query, { id: answer.itemId }, function(err, results){
                // if error occurs, show error message
                if (err) throw err;
                // check is sufficient inventory in stock, if so complete purchase by showing
                // buyer their cost and updating inventory level
                if (results[0].stock_quantity >  answer.quantity){
                    console.log('You have successfully purchased ' + answer.quantity + ' '  +
                    results[0].product_name + '(s) for a total of $' + (answer.quantity*results[0].price).toFixed(2));
                    updateSales((results[0].price * answer.quantity), results[0].id + '\n');
                    updateInventory((results[0].stock_quantity - answer.quantity), results[0].id + '\n');
                } else {
                    console.log('Insufficient quantity in stock.\n');
                    // ask user what they would like to do
                    start();
                }
            });
        }
    });

}

// function updateInvetory adjusts stock quantities after a successful purchase
function updateSales(valueSold, id) {
    var query = 'UPDATE products SET product_sales= ? WHERE id= ?;'
    connection.query(query, [valueSold, id], function(err){
        if (err) throw err;
        console.log('Product Sales Updated.')
        // start();
    })
}
// function updateInvetory adjusts stock quantities after a successful purchase
function updateInventory(numberPurchased, id) {
    var query = 'UPDATE products SET stock_quantity= ? WHERE id= ?;'
    connection.query(query, [numberPurchased, id], function(err){
        if (err) throw err;
        console.log('Inventory Updated.')
        start();
    })
}

start();



