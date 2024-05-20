const express = require("express");
const app = express();
const port = 3000;
const db = require("./connect");
const bodyParser = require("body-parser");
const response = require("./response");
const responputra = require("./responputra");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  responputra(200, "API ready to go", "SUCCESS", res);
});
app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, field) => {
    if (err) throw err;
    responputra(200, field, "get mahasiswa", res);
  });
});

app.get("/mahasiswa/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM mahasiswa WHERE id = ${id}`;
  db.query(sql, (err, field) => {
    if (err) throw err;
    responputra(200, field, `id mahasiswa : ${id}`, res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${nama_lengkap}', '${kelas}', '${alamat}') `;
  db.query(sql, (err, field) => {
    if (err) responputra(500, "invalid", "error", res);
    if (field?.affectedRows) {
      const data = {
        isSuccess: field.affectedRows,
        id: field.insertId,
      };
      responputra(200, data, "data berhasil ditambah", res);
    }
  });
});

app.put("/", (req, res) => {
  const { id, nim, nama_lengkap, kelas, alamat } = req.body;
  console.log(id, nama_lengkap, kelas, alamat);
  const sql = `UPDATE mahasiswa SET nim = ${nim}, nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE id = ${id} `;
  db.query(sql, (err, field) => {
    if (err) responputra(500, "invalid", "error", res);
    if (field?.affectedRows) {
      const data = {
        isSuccess: field.affectedRows,
        id: field.insertId,
      };
      responputra(200, data, "data berhasil diubah", res);
    }
  });
});

app.delete("/", (req, res) => {
  const id= req.body.id;
  const sql = `DELETE FROM mahasiswa WHERE id = ${id} `;
  db.query(sql, (err, field) => {
    if (err) responputra(500, "invalid", "error", res);
    if (field?.affectedRows) {
      const data = {
        isSuccess: field.affectedRows,
      };
      responputra(200, data, "data berhasil dihapus",res);
    }else{
      responputra(404, data, "user not found", res);
    }
  });
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (error, result) => {
    // console.log(result);
    response(200, result, "getting all data", res);
  });
});

app.get("/oneData", (req, res) => {
  const sql = `SELECT * FROM mahasiswa WHERE kelas = ${req.query.kelas}`;
  db.query(sql, (error, result) => {
    // console.log(result);
    response(200, result, "getting one data", res);
  });
});

app.post("/login", (req, res) => {
  console.log({ requestFromOutside: req.body });
  res.send("login success!");
});

app.put("/username", (req, res) => {
  console.log({ updateData: req.body });
  res.send("update berhasil success!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
