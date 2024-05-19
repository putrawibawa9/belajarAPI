const express = require("express");
const app = express();
const port = 3000;
const db = require('./connect')
const bodyParser = require('body-parser')
const response = require('./response')

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const sql = "SELECT * FROM mahasiswa"
  db.query(sql, (error, result) =>{
    // console.log(result);
    response(200, result, "getting all data", res)
  })
});

app.get("/oneData", (req, res) => {
 const sql = `SELECT * FROM mahasiswa WHERE id = ${req.query.kelas}`
 db.query(sql, (error, result) => {
   // console.log(result);
   response(200, result, "getting one data", res)
 })
})


app.post("/login", (req, res) => {
  console.log({ requestFromOutside: req.body})
  res.send("login success!")
});

app.put("/username", (req, res) => {
  console.log({ updateData: req.body})
  res.send("update berhasil success!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


