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
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected");
    }
});

// API to get students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});