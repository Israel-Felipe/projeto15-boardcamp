import { connection } from "../database/db.js";
import { rentalSchema } from "../schemas/rentals.schemas.js";

async function rentalBodyValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  const validation = rentalSchema.validate(
    {
      customerId,
      gameId,
      daysRented,
    },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).send({ message: errors });
    return;
  }

  res.locals.body = {
    customerId,
    gameId,
    daysRented,
  };

  next();
}

async function rentalCustomerValidation(req, res, next) {
  const { customerId } = res.locals.body;

  try {
    const customer = (
      await connection.query("SELECT * FROM customers WHERE id = $1;", [
        customerId,
      ])
    ).rows[0];

    if (!customer) {
      res.status(400).send({ message: "Cliente não existe" });
      return;
    }

    res.locals.customer = customer;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function rentalGameValidation(req, res, next) {
  const { gameId } = res.locals.body;

  try {
    const game = (
      await connection.query("SELECT * FROM games WHERE id = $1;", [gameId])
    ).rows[0];

    if (!game) {
      res.status(400).send({ message: "Jogo não encontrado" });
      return;
    }

    res.locals.game = game;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function rentalsPossibilityValidation(req, res, next) {
  const { game } = res.locals;

  try {
    const numberRentals = (
      await connection.query(
        'SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;',
        [game.id]
      )
    ).rows[0].count;
    if (Number(numberRentals) >= game.stockTotal) {
      res.status(400).send({ message: "Jogo esgotado no momento" });
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function rentalIdValidation(req, res, next) {
  const { id } = req.params;

  try {
    const rental = (
      await connection.query("SELECT * FROM rentals WHERE id = $1;", [id])
    ).rows[0];

    if (!rental) {
      res.status(404).send({ message: "Aluguel não encontrado" });
      return;
    }

    res.locals.rental = rental;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function rentalNotReturnedValidation(req, res, next) {
  const { rental } = res.locals;

  if (rental.returnDate) {
    res.status(400).send({ message: "O aluguel já foi concluído" });
    return;
  }

  next();
}

async function rentalReturnedValidation(req, res, next) {
  const { rental } = res.locals;

  if (!rental.returnDate) {
    res.status(400).send({ message: "O aluguel ainda está em aberto" });
    return;
  }

  next();
}

export {
  rentalBodyValidation,
  rentalCustomerValidation,
  rentalGameValidation,
  rentalsPossibilityValidation,
  rentalIdValidation,
  rentalNotReturnedValidation,
  rentalReturnedValidation,
};
