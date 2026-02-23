create database login_db;
use login_db;
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10,2)
);
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);


INSERT INTO customers (name, email) VALUES
('Kishor', 'kishor@gmail.com'),
('Arun', 'arun@gmail.com'),
('Priya', 'priya@gmail.com');

INSERT INTO products (product_name, price) VALUES
('Laptop', 50000),
('Mouse', 500),
('Keyboard', 1500);

INSERT INTO orders (customer_id, product_id, quantity, order_date) VALUES
(1, 1, 1, '2024-06-01'),
(1, 2, 2, '2024-06-05'),
(2, 3, 1, '2024-06-02'),
(3, 1, 1, '2024-06-03'),
(1, 3, 3, '2024-06-10');
SELECT c.name, p.product_name, o.quantity, p.price, (o.quantity * p.price) AS total_price
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id;

SELECT * FROM (
    SELECT c.name, (o.quantity * p.price) AS total_price
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN products p ON o.product_id = p.product_id
) AS t
ORDER BY total_price DESC
LIMIT 1;

SELECT name FROM customers 
WHERE customer_id = (
    SELECT customer_id FROM orders
    GROUP BY customer_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
);