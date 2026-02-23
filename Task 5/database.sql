create database login_db;
use login_db;
SET SQL_SAFE_UPDATES = 0;

CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    balance DOUBLE
);

INSERT INTO accounts (name, balance) VALUES
('Kishor_User', 10000),
('Amazon_Merchant', 5000);

START TRANSACTION;

UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

COMMIT;
-- ROLLBACK;
SELECT * FROM accounts;