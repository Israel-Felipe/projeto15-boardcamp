import express from "express";
import {
  createCustomer,
  readSingleCustomer,
  readCustomers,
  updateCustomer,
} from "../controllers/customers.controllers.js";

const router = express.Router();

router.get("/customers", readCustomers);
router.get("/customers/:id", readSingleCustomer);
router.post("/customers", createCustomer);
router.put("/customers/:id", updateCustomer);

export default router;
