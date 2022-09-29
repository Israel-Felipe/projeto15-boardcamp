import express from "express";
import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "boardcamp",
  password: "123",
});

const app = express();
app.use(express.json());

app.get("/categories", (req, res) => {
  connection.query("SELECT * FROM categories").then((categories) => {
    res.send(categories.rows);
  });
});

app.post("/categories", (req, res) => {
  const { name } = req.body;
  connection
    .query(`INSERT INTO categories (name) VALUES ('${name}')`)
    .then((categories) => {
      res.sendStatus(201);
    });
});

app.listen(4000, () => {
  console.log("Server listening on port 4000.");
});
