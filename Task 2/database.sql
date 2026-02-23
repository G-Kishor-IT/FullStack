create database login_db;
use login_db;
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(100),
    join_date DATE
);
INSERT INTO students (name, department, join_date) VALUES
('Arun', 'CSE', '2024-06-10'),
('Kishor', 'IT', '2024-05-12'),
('Priya', 'CSE', '2024-04-22'),
('Divya', 'ECE', '2024-03-15'),
('Ravi', 'IT', '2024-01-01');

SELECT*FROM students;