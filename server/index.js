const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "dbitems",
});

app.get("/items", (req, res) => {
  let SQL = "SELECT * from items";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/item", (req, res) => {
  const { item } = req.body;
  let SQL = "INSERT INTO items ( item ) VALUES (?)";
  db.query(SQL, item, (err, result) => {
    console.log(err);
  });
});

app.delete("/item/:id", (req, res) => {
  const { id } = req.params;
  console.log("Id: ", id);

  let SQL = "DELETE FROM items WHERE ( `id` = ? )";

  db.query(SQL, id, (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running server");
});
