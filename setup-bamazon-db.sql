-- remove existing database
DROP DATABASE IF EXISTS bamazon;

-- create database for project
CREATE DATABASE bamazon;

-- select database to use for the following commands
USE bamazon;

-- create table for bamazonCustomer and bamazonManager
CREATE TABLE products (
  -- set id so that it increases automatically without duplication - null values not allowed
  id INTEGER AUTO_INCREMENT NOT NULL,
  -- string variable that fills entries with null if no entry made
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(25) NULL,
  -- variable that displays ten digits with two behind decimal point
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  -- set primary key as unique identifier for rows
  PRIMARY KEY (id)
);

-- insert data into products table
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

-- table for bamazonSupervisor
CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(25) NULL,
  overhead_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

-- add column to products
ALTER TABLE products
  ADD product_sales DECIMAL(10,2) NULL;