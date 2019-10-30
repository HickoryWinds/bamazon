// import inquirer and mysql modules
var inquirer = require('inquirer');
var mysql = require('mysql');
// import table to format display of department sales
var {table} = require('table');

// create object for connection to mysqul database
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
    // console.log('connected');
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
    }).then(function(answer){
        switch(answer.options) {
            case 'View Product Sales by Department':
                viewSalesByDept();
                // testing of table
            // let data, output;
            //     data = [
            //         ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit'],
            //         ['0A', '0B', '0C', '0D', '0E'],
            //         ['1A', '1B', '1C', '1D', '1E'],
            //         ['2A', '2B', '2C', '2D', '2E']
            //     ];
            //     // console.log(data);
                
            //     output = table(data);
            //     console.log(output);
                // connection.end();
                // start();
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
    // console.log('viewing sales');

    // define arrays to hold display data
    // var arrDeptIds = [];
    // var arrDeptNames = [];
    var transArray = [];
    // var transArray = ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit'];
    var data = []
    var output;
    // define mysql query
    // var query = 'SELECT * FROM departments;';
    // var query = 'SELECT departments.id, departments.department_name, departments.overhead_costs, products.product_sales FROM departments ';
    //     query+='INNER JOIN products ON (departments.department_name = products.department_name) ';
    //     query+='GROUP BY departments.department_name ORDER BY departments.id';
    var query = 'SELECT d.id, d.department_name, d.overhead_costs, SUM(product_sales) product_sales '
        query+='FROM bamazon.departments d INNER JOIN bamazon.products p ON p.department_name = d.department_name '
        query+='GROUP BY p.department_name ORDER BY d.id;';
    // establish connection and make query
    connection.query(query, function(err, results){
        console.log(results);
        // if error occurs, show error message
        if (err) throw err;
        // list all items in inventory and their properties
        for (var i = 0; i < (results.length); i++) {
            transArray[i] = [results[i].id, results[i].department_name, results[i].overhead_costs, results[i].product_sales,
             (results[i].product_sales - results[i].overhead_costs)];
            // arrDeptIds.push(results[i].id);
            // arrDeptNames.push(results[i].department_name);
            data.push(transArray[i]);
        }
        data.splice(0, 0, ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit']);
        // connection.end();
        //testing of table
        console.log(data);
        console.log(transArray);
        // data = [
        //         transArray[1],
        //         transArray[2]
        //         // ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit'],
        //         // masterArray
        //         // arrDeptIds,
        //         // arrDeptNames
        //         // ['0A', '0B', '0C', '0D', '0E'],
        //         // ['1A', '1B', '1C', '1D', '1E'],
        //         // ['2A', '2B', '2C', '2D', '2E']
        //     ];
            output = table(data);
            console.log(output);
            // connection.end();
            start();
        });
}

// function addDepartment adds a new department to the table
function addDepartment( ) {
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
]).then(function(answer){
    // connect to database and query to insert data
    connection.query(
        'INSERT INTO departments SET ?',
        {
            department_name: answer.deptName,
            overhead_costs: answer.deptOverhead || 0
        },
        function(err){
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


// var songAndAlbumSearch = function(){
//     inquirer.prompt({
//         name: 'artist',
//         type: 'input',
//         message: 'What artist would you like to look for?'
//     }).then(function(answer){
//         var query = 'SELECT topalbums.year, topalbums.position, topalbums.album, top5000.artist, top5000.song FROM topalbums ';
//         query+='INNER JOIN top5000 ON (topalbums.artist = top5000.artist AND topalbums.year = top5000.year) ';
//         query+='WHERE (topalbums.artist = ? AND top5000.artist = ?) ORDER BY topalbums.year';

//         connection.query(query, [answer.artist, answer.artist], function(err, res){
//             if (err) throw err;
//             // console.log('@@@@@@@@@@@@@@');
//             // console.log(res);
//             console.log(res.length + '\nMatches Found!\n');
//             for (var x = 0; x < res.length; x++){
//                 console.log('Album Position: ' + res[x].position + '\nArtist: ' +
//                 res[x].artist + '\nSong: ' + res[x].song + '\nAlbum: ' + res[x].album +
//                 '\nYear: ' + res[x].year + '\n---------\n');
//             }
//             runSearch();
//         })
//     })
// }