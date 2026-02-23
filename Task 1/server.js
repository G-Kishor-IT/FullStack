const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve HTML files

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kishor15",   // 🔥 EXACT MySQL password
  database: "login_db"
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB ERROR:", err);
  } else {
    console.log("✅ Database connected");
  }
});

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("SERVER WORKING ✅");
});

// REGISTER API
app.post("/register", (req, res) => {
  console.log("📩 DATA RECEIVED:", req.body);

  const { name, dob, email, dept, contact, password } = req.body;

  // Validate inputs
  if (!name || !dob || !email || !dept || !contact || !password) {
    return res.status(400).json({ message: "All fields required ❌" });
  }

  const sql =
    "INSERT INTO web (name, dob, email, dept, contact, pass) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, dob, email, dept, contact, password], (err, result) => {
    if (err) {
      console.log("❌ SQL ERROR:", err);
      return res.status(500).json({ message: "Insert Failed ❌" });
    }

    console.log("✅ Data Inserted:", result.insertId);
    res.json({ message: "Registered Successfully ✅" });
  });
});

// START SERVER
app.listen(3000, () => {
  console.log("🚀 Server started on http://localhost:3000");
});
