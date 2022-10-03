import { connection } from "../database/db.js";

async function createRental(req, res) {
  const { customerId, gameId, daysRented } = res.locals.body;
  const { game } = res.locals;
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  try {
    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);',
      [
        customerId,
        gameId,
        date,
        daysRented,
        null,
        game.pricePerDay * daysRented,
        null,
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function readRentals(req, res) {
  const { customer, game } = res.locals;
  let rentals;

  try {
    if (customer && game) {
      rentals = (
        await connection.query(
          `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer,
          json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
            FROM rentals
            JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id
            WHERE rentals."customerId" = $1 AND rentals."gameId" = $2;`,
          [customer.id, game.id]
        )
      ).rows;
    } else if (customer && !game) {
      rentals = (
        await connection.query(
          `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer,
          json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
          FROM rentals
          JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id
          JOIN categories ON games."categoryId" = categories.id
          WHERE rentals."customerId" = $1;`,
          [customer.id]
        )
      ).rows;
    } else if (!customer && game) {
      rentals = (
        await connection.query(
          `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer,
          json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
          FROM rentals
          JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id
          JOIN categories ON games."categoryId" = categories.id
          WHERE rentals."gameId" = $1;`,
          [game.id]
        )
      ).rows;
    } else {
      rentals = (
        await connection.query(
          `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer,
          json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
          FROM rentals
          JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id
          JOIN categories ON games."categoryId" = categories.id;`
        )
      ).rows;
    }

    rentals.forEach((rent) => {
      rent.rentDate = rent.rentDate.toISOString().split("T")[0];
    });

    res.send(rentals);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { createRental, readRentals };
