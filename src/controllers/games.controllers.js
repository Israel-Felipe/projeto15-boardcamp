import { connection } from "../database/db.js";

async function readGames(req, res) {
  const { name } = req.query;

  try {
    if (name === undefined) {
      const games = (
        await connection.query(
          'SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;'
        )
      ).rows;

      res.send(games);
      return;
    } else {
      const games = (
        await connection.query(
          `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name ILIKE ($1 || '%');`,
          [name]
        )
      ).rows;

      res.send(games);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function createGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.body;
  connection
    .query(
      `INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ('${name}','${image}',${stockTotal},${categoryId},${pricePerDay})`
    )
    .then(() => {
      res.sendStatus(201);
    });
}

export { readGames, createGame };
