import { connection } from "../database/db.js";
import { gamesSchema } from "../schemas/games.schemas.js";

export async function gameBodyValidation(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  const validation = gamesSchema.validate(
    {
      name,
      image,
      stockTotal,
      categoryId,
      pricePerDay,
    },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).send({ message: errors });
    return;
  }

  try {
    const repeatedGame = (
      await connection.query("SELECT * FROM games WHERE name = $1;", [name])
    ).rows[0];

    if (repeatedGame) {
      res.sendStatus(409);
      return;
    }

    const category = (
      await connection.query("SELECT * FROM categories WHERE id = $1;", [
        categoryId,
      ])
    ).rows[0];

    if (!category) {
      res.sendStatus(400);
      return;
    }

    res.locals.body = {
      name,
      image,
      stockTotal,
      categoryId,
      pricePerDay,
    };
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function gameIdSearchValidation(req, res, next) {
  const { gameId } = req.query;
  if (!gameId) {
    next();
    return;
  }

  try {
    const game = (
      await connection.query("SELECT * FROM games WHERE id = $1;", [gameId])
    ).rows[0];

    if (!game) {
      res.status(404).send({ message: "Jogo não encontrado" });
      return;
    }

    res.locals.game = game;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
