create database login_db;
use login_db;
CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);
INSERT INTO login (username, password) VALUES
('kishor', '12345'),
('admin', 'admin123');
SELECT*FROM login;