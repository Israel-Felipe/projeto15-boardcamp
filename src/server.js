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

/* categories */
app.get("/categories", (req, res) => {
  connection.query("SELECT * FROM categories").then((categories) => {
    res.send(categories.rows);
  });
});

app.post("/categories", (req, res) => {
  const { name } = req.body;
  connection
    .query(`INSERT INTO categories (name) VALUES ('${name}')`)
    .then(() => {
      res.sendStatus(201);
    });
});

/* games */
app.get("/games", (req, res) => {
  connection.query("SELECT * FROM games").then((games) => {
    res.send(games.rows);
  });
});

app.post("/games", (req, res) => {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  connection
    .query(
      `INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ('${name}','${image}',${stockTotal},${categoryId},${pricePerDay})`
    )
    .then(() => {
      res.sendStatus(201);
    });
});

/* customers */
app.get("/customers", (req, res) => {
  connection.query("SELECT * FROM customers").then((customers) => {
    res.send(customers.rows);
  });
});

app.post("/customers", (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  connection
    .query(
      `INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ('${name}','${phone}',${cpf},${birthday})`
    )
    .then(() => {
      res.sendStatus(201);
    });
});

app.put("/customers/:id", (req, res) => {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  connection
    .query(
      `UPDATE customers SET name='${name}' and phone='${phone}' and cpf='${cpf}' and birthday='${birthday}' WHERE id='${id}';`
    )
    .then(() => {
      res.sendStatus(200);
    });
});

app.listen(4000, () => {
  console.log("Server listening on port 4000.");
});
