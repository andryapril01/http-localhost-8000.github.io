const express = require("express");
const mysql = require("mysql");
const BodryParser = require("body-parser");

const app = express();

app.use(BodryParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "siswa",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("database connected...");

  // untuk get data
  app.get("/", (req, res) => {
    const sql = "SELECT *FROM kelas";
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "DAFTAR SISWA" });
    });
  });

  //untuk insert data
  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO kelas (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("Server ready...");
});
