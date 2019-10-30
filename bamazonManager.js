// import inquirer and mysql modules
var inquirer = require('inquirer');
var mysql = require('mysql');

// create object for connection to mysql database
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

// function start() creats menu of manager options and
// selects which function to use
function start() {
    inquirer.prompt({
        name: 'options',
        type: 'rawlist',
        message: 'What mangerial tasks do you need to do?',
        choices: ['View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product',
            'Exit']
    }).then(function (answer) {
        // console.log(answer.options);
        switch(answer.options) {
            case 'View Products for Sale':
                allProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addItem();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}

// function allProducts lists all properties of all items in inventory

    
function allProducts() {
    // define mysql query
    var query = 'SELECT * FROM products;';
    // establish connection and make query
    connection.query(query, function(err, results){
        // if error occurs, show error message
        if (err) throw err;
        // list all items in inventory and their properties
        for (var i = 0; i < results.length; i++) {
            console.log('id: ' + results[i].id + ' || Product Name: ' + results[i].product_name +
            ' || Department Name: ' + results[i].department_name + ' || Price: ' + results[i].price +
            ' || Stock Quantity: ' + results[i].stock_quantity);
        }
        start();
    });
}

function lowInventory(){
    // define mysql query
    var query = 'SELECT * FROM products';
    // establish connection to database
    connection.query(query, function(err, results){
        for(var j = 0; j < results.length; j++){
            if(results[j].stock_quantity < 5) {
                console.log('id: ' + results[j].id + ' || Product Name: ' + results[j].product_name +
                ' || Department Name: ' + results[j].department_name + ' || Price: ' + results[j].price +
                ' || Stock Quantity: ' + results[j].stock_quantity);
            }
        }
    start();
    });
}

// function addInventory adds items to the specified item
function addInventory() {
    inquirer.prompt([{
        name: 'itemId',
        type: 'input',
        message: 'Item Id of the item to add inventory to: '
    } , {
        name: 'addQuantity',
        type: 'input',
        message: 'Quantity of inventory to be added: '
    }
    ]).then(function(answer){
        // create database query
        var query = 'SELECT stock_quantity FROM products WHERE id= ?';
        connection.query(query, [answer.itemId], function(err, results){
            if (err) throw err;
            // add quantity specified to inventory - both result and answer must be converted to ints from strings
            newQuantity = parseInt(results[0].stock_quantity) + parseInt(answer.addQuantity);

            // console.log(results[0])
            // console.log(newQuantity);

            // update database with new quantity using another query
            var nextQuery = 'UPDATE products SET stock_quantity= ? WHERE id= ?';
            connection.query(nextQuery, [ newQuantity, answer.itemId ], function(err){
                if (err) throw err;
                console.log('Inventory Updated.');
                start();
            })
        })
    })
}

// function addItem adds a new item to inventory
function addItem() {
    // ask for new item information
    inquirer.prompt([
        {
            name: 'itemName',
            type: 'input',
            message: 'Name of item to be added: '
        }, {
            name: 'itemDept',
            type: 'input',
            message: 'Department name for item: '
        }, {
            name: 'itemPrice',
            type: 'input',
            message: 'Item price: '
        }, {
            name: 'itemQuant',
            type: 'input',
            message: 'Item quantity: '
        }
    ]).then(function(answer) {
        
        // var query = 'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?';
        // connection.query(query, [(answer.itemName, answer.itemDept, parseFloat(answer.itemPrice), parseInt(answer.itemQuant))], function(err) {
            //     if (err) throw err;
            //     console.log('Item added successfully.');
            // });

            // connect to database and query to insert data
        connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: answer.itemName,
              department_name: answer.itemDept,
              price: parseFloat(answer.itemPrice) || 0,
              stock_quantity:  parseInt(answer.itemQuant) || 0
            },
            function(err) {
              if (err) throw err;
              console.log('Item successfully added.');
              // re-prompt manger for additional actions
              start();
            }
          );
    });
}
// initial start
start();

