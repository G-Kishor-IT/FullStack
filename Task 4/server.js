const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kishor15",   // 🔥 EXACT MySQL password
  database: "login_db"
});

db.connect(err => {
    if (err) console.log("DB Error:", err);
    else console.log("MySQL Connected");
});

// JOIN Query API
app.get("/orders", (req, res) => {
    const sql = `
    SELECT c.name, p.product_name, o.quantity, (o.quantity * p.price) AS total_price
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN products p ON o.product_id = p.product_id`;
    
    db.query(sql, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});

// Highest Order Subquery
app.get("/highest", (req, res) => {
    const sql = `
    SELECT c.name, (o.quantity * p.price) AS total_price
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN products p ON o.product_id = p.product_id
    ORDER BY total_price DESC LIMIT 1`;
    
    db.query(sql, (err, result) => {
        res.send(result[0]);
    });
});

// Most Active Customer
app.get("/active", (req, res) => {
    const sql = `
    SELECT name FROM customers 
    WHERE customer_id = (
        SELECT customer_id FROM orders
        GROUP BY customer_id
        ORDER BY COUNT(*) DESC LIMIT 1
    )`;
    
    db.query(sql, (err, result) => {
        res.send(result[0]);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});