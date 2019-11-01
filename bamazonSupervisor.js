// bamazonSupervisor can be used to display overhead cost, total sales, and profitability by department.
// The manager can also add a new department to the departments table.

// import inquirer and mysql modules
var inquirer = require('inquirer');
var mysql = require('mysql');
// import table to format display of department sales
var { table } = require('table');

// create object for connection to mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

// connect to bamazon database
connection.connect(function (err) {
    if (err) throw err;
});

// function start creates menu of supervisor options and
// selects which function to use
function start() {

    inquirer.prompt({
        name: 'options',
        type: 'rawlist',
        message: 'What supervisory task do you need to perform?',
        choices: [
            'View Product Sales by Department',
            'Create New Department',
            'Exit'
        ]
    }).then(function (answer) {
        switch (answer.options) {
            case 'View Product Sales by Department':
                viewSalesByDept();
                break;
            case 'Create New Department':
                addDepartment();
                // connection.end();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}
// function viewSalesByDept joins data from the products and department
// tables, retrieves data, calculates the total profit, and displays data in table form
function viewSalesByDept() {
    // define arrays to hold display data
    var transArray = [];
    var data = []
    var output;
    // define mysql query using left join for departments and products tables
    // use sum and group to get product sales for each department
    var query = 'SELECT d.id, d.department_name, d.overhead_costs, SUM(product_sales) product_sales '
    query += 'FROM bamazon.departments d LEFT JOIN bamazon.products p ON p.department_name = d.department_name '
    query += 'GROUP BY p.department_name ORDER BY d.id;';
    // establish connection and make query
    connection.query(query, function (err, results) {
        // if error occurs, show error message
        if (err) throw err;
        // list all departments  and display overhead costs from departments table and sum of product sales from products
        //table; also calculate profit from product sales and overhead costs
        
        for (var i = 0; i < (results.length); i++) {
            if (results[i].product_sales === null) {results[i].product_sales = 0;}
            transArray[i] = [results[i].id, results[i].department_name, results[i].overhead_costs.toFixed(2), results[i].product_sales.toFixed(2),
            (results[i].product_sales - results[i].overhead_costs).toFixed(2)];
            data.push(transArray[i]);
        }
        // splice titles into array before printing
        data.splice(0, 0, ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit']);
        //  put data into table and display it
        output = table(data);
        console.log(output);
        // return to start menu
        start();
    });
}

// function addDepartment adds a new department to the table
function addDepartment() {
    // ask for department information
    inquirer.prompt([{
        name: 'deptName',
        type: 'input',
        message: 'Department name to add: '
    }, {
        name: 'deptOverhead',
        type: 'input',
        message: 'What are the department overhead costs?'

    }
    ]).then(function (answer) {
        // connect to database and query to insert data
        connection.query(
            'INSERT INTO departments SET ?',
            {
                department_name: answer.deptName,
                overhead_costs: answer.deptOverhead || 0
            },
            function (err) {
                if (err) throw err;
                console.log('Department added successfully.')
                // take user back to start menu
                start();
            }
        )
    })
}
// call initial to begin interaction
start();