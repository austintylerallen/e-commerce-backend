-- DROP DATABASE
DROP DATABASE IF EXISTS shop_db;

-- CREATE DATABASE
CREATE DATABASE shop_db;

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 10,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

-- Create tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255)
);

-- Create product_tags table
CREATE TABLE product_tags (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE
);
