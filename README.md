## bamazon

#### bamazon is a sales/inventory/management tool which consists of three JavaScript modules: bamazonCustomer, bamazonManager, and bamazonManager. Each of these modules use MySQL, JavaScript, and node.js technologies. All modules use npm inquirer to construct a user interface using questions. Each module connects to MySQL via npm mysql.

### bamazonCustomer allows a customer to purchase an item after viewing a list of available items. 

![picture](bamC-start.png)

#### If the customer enters in an invalid Id number for the purchase, a message is displayed and the customer is taken back to the start menu.

![picture](bamC-nogo.png)


#### If there is not sufficient inventory, a message is shown. In both instances the customer is taken back to the start screen.

![picture](bamC-fail.png)

#### If a sufficient number of items are available in inventory, the customer's purchase is completed and the number of items and total cost are displayed.

![picture](bamC-success.png)

### bamazonManager provides the following tools: view all products for sale, view producs with less than 5 items in inventory, add more items to current inventory, and add a new product to the product list.

![picture](bamM-start.png)

#### The manager's view of inventory is the same that is displayed to the customer when making a purchase.

![picture](bamM-stock.png)

#### When there is less than 5 items of a product in the inventory, the manager is alerted.

![picture](bamM-low.png)

#### The manager may add to the number of items of product.

![picture](bamM-low-add.png)

#### An entirely new product may be added to inventory by the manager.

![picture](bamM-inventory-add.png)

### bamazonSupervisor can be used to display overhead cost, total sales, and profitability by department. The manager can also add a new department to the departments table.

![picture](bamS-start.png)

#### The table used by the supervisor is created by using a right join to display the departments table and the sum of product sales from the products table. A profitibility calculation is made using the overhead from the departments table and the sum of product sales from the products table.

![picture](bamS-sales-dept-1.png)

#### The supervisor can add a new department to the departments table by entering the department name and over head costs.

![picture](bamS-new-dept.png)
![picture](bamS-new-dept-display.png)

#### This may be a department that is has no items in the products table so that when a the manager Views the Product Sales an error would be caused by having a null value returned for product sales, so the code includes a substitution of 0 for null so that the value can be displayed.

![picture](mysql-new-dept-dept.png)
![picture](mysql-new-dept-product.png)


#### bamazon was constructed by me as the sole contributor. Any questions regarding the use of this program can be directed to me at ronfud2000@gmail.com - hope you enjoy using it!