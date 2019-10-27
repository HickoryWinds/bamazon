DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(25) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100),
        ("refrigerator", "appliances", 300.00, 100);