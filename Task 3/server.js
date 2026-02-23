const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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

// Login API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM login WHERE username=? AND password=?";
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.send({ success: false });

        if (result.length > 0) {
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});