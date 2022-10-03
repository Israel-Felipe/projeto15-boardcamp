import express from "express";
import {
  createRental,
  readRentals,
  updateRental,
  deleteRental,
} from "../controllers/rentals.controllers.js";
import { customerIdSearchValidation } from "../middlewares/customers.middlewares.js";
import { gameIdSearchValidation } from "../middlewares/games.middlewares.js";
import {
  rentalBodyValidation,
  rentalCustomerValidation,
  rentalGameValidation,
  rentalsPossibilityValidation,
  rentalIdValidation,
  rentalNotReturnedValidation,
  rentalReturnedValidation,
} from "../middlewares/rentals.middlewares.js";

const router = express.Router();

router.post(
  "/rentals",
  rentalBodyValidation,
  rentalCustomerValidation,
  rentalGameValidation,
  rentalsPossibilityValidation,
  createRental
);

router.get(
  "/rentals",
  customerIdSearchValidation,
  gameIdSearchValidation,
  readRentals
);

router.post(
  "/rentals/:id/return",
  rentalIdValidation,
  rentalNotReturnedValidation,
  updateRental
);

router.delete(
  "/rentals/:id",
  rentalIdValidation,
  rentalReturnedValidation,
  deleteRental
);

export default router;
