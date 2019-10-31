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
  price DECIMAL(10,2) DEFAULT 0,
  stock_quantity INT NULL,
  -- set primary key as unique identifier for rows
  PRIMARY KEY (id)
);

-- insert data into products table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("refrigerator", "appliances", 297.69, 100),
        ("washing machine", "appliances", 299.99, 100),
        ("clothes dryer", "appliances", 259.99, 100),
        ("canoe", "sporting goods", 615.11, 100),
        ("kayak", "sporting goods", 85.69, 100),
        ("House of Dark Shadows", "movies", 14.49, 100),
        ("Dracula Has Risen From The Grave", "movies", 13.39, 100),
        ("Soylent Squared - 30 Pack", "food", 24.00, 100),
        ("Almond Flour - 5# Bag", "food", 38.00, 100),
        ("1984", "books", 10.00, 100);

-- table for bamazonSupervisor
CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(25) NULL,
  overhead_costs DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO departments (department_name, overhead_costs)
VALUES  ("appliances", 500000.00),
        ("sporting goods" , 375000.00),
        ("movies", 100000.00),
        ("food", 230000.00),
        ("books", 150000);

-- add column to products
ALTER TABLE products
  ADD product_sales DECIMAL(10,2) DEFAULT 0;