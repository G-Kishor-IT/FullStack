create database login_db;
use login_db;
CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    join_date DATE
);
CREATE TABLE student_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    action_type VARCHAR(20),
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$
CREATE TRIGGER log_student_insert
AFTER INSERT ON student
FOR EACH ROW
BEGIN
    INSERT INTO student_logs(student_id, action_type)
    VALUES (NEW.id, 'INSERT');
END $$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER log_student_update
AFTER UPDATE ON student
FOR EACH ROW
BEGIN
    INSERT INTO student_logs(student_id, action_type)
    VALUES (NEW.id, 'UPDATE');
END $$
DELIMITER ;

CREATE VIEW daily_activity_report AS
SELECT 
    DATE(action_time) AS activity_date,
    action_type,
    COUNT(*) AS total_actions
FROM student_logs
GROUP BY DATE(action_time), action_type;

INSERT INTO student(name, department, join_date)
VALUES ('Kishor', 'CSE', '2026-02-23');

UPDATE students SET department='IT' WHERE id=1;

SELECT * FROM student_logs;
SELECT * FROM daily_activity_report;