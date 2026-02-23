const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kishor15",     // your MySQL password
  database: "login_db"      // your database name
});

// Connect DB
db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});


// ✅ ADD STUDENT (Trigger logs automatically)
app.post("/addStudent", (req, res) => {
  const { name, department } = req.body;

  db.query(
    "INSERT INTO student(name, department, join_date) VALUES (?, ?, CURDATE())",
    [name, department],
    (err) => {
      if (err) {
        console.log("Insert Error:", err);
        return res.json({ success: false });
      }
      res.json({ success: true });
    }
  );
});


// ✅ GET ALL STUDENTS
app.get("/students", (req, res) => {
  db.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.log("Fetch Error:", err);
      return res.json([]);
    }
    res.json(result);
  });
});


// ✅ DAILY ACTIVITY VIEW REPORT
app.get("/report", (req, res) => {
  db.query("SELECT * FROM daily_activity_report", (err, result) => {
    if (err) {
      console.log("View Error:", err);
      return res.json([]);
    }
    res.json(result);
  });
});


// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});