create database login_db;
use login_db;
CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50),
password VARCHAR(50)
);

INSERT INTO users values (1, 'admin','1234');
SELECT *FROM users;