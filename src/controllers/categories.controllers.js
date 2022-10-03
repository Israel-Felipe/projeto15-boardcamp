import { connection } from "../database/db.js";

async function readCategories(req, res) {
  connection.query("SELECT * FROM categories").then((categories) => {
    res.send(categories.rows);
  });
}

async function createCategorie(req, res) {
  const { name } = req.body;
  connection
    .query("INSERT INTO categories (name) VALUES ($1);", [name])
    .then(() => {
      res.sendStatus(201);
    });
}

export { readCategories, createCategorie };
