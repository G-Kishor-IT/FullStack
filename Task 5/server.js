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

db.connect(()=>console.log("MySQL Connected"));

app.get("/balance",(req,res)=>{
  db.query("SELECT * FROM accounts",(e,r)=>res.json(r));
});

app.post("/addUser",(req,res)=>{
  db.query("INSERT INTO accounts(name,balance) VALUES(?,?)",
  [req.body.name, req.body.balance], ()=>res.send("ok"));
});

app.post("/deleteUser",(req,res)=>{
  db.query("DELETE FROM accounts WHERE name=?",[req.body.name],()=>res.send("ok"));
});

app.post("/deposit",(req,res)=>{
  db.query("UPDATE accounts SET balance=balance+? WHERE name=?",
  [req.body.amount, req.body.name], ()=>res.send("ok"));
});

app.post("/withdraw",(req,res)=>{
  db.query("UPDATE accounts SET balance=balance-? WHERE name=?",
  [req.body.amount, req.body.name], ()=>res.send("ok"));
});

// TRANSACTION PAYMENT
app.post("/pay",(req,res)=>{
  db.beginTransaction(err=>{
    if(err) return res.send("fail");

    db.query("UPDATE accounts SET balance=balance-? WHERE name=?",
    [req.body.amount, req.body.from], err=>{
      if(err) return db.rollback(()=>res.send("fail"));

      db.query("UPDATE accounts SET balance=balance+? WHERE name=?",
      [req.body.amount, req.body.to], err=>{
        if(err) return db.rollback(()=>res.send("fail"));

        db.commit(err=>{
          if(err) return db.rollback(()=>res.send("fail"));
          res.send("success");
        });
      });
    });
  });
});

app.listen(3000,()=>console.log("Server running http://localhost:3000"));