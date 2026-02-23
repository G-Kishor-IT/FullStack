const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kishor15",     // your MySQL password
  database: "login_db"      // your database name
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Save Feedback API
app.post("/feedback", (req, res) => {
    const { name, email, feedback } = req.body;
    const sql = "INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)";
    
    db.query(sql, [name, email, feedback], (err, result) => {
        if (err) throw err;
        res.send("Feedback Saved");
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));