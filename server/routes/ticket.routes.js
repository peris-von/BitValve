import express from "express";
import { submitTicket } from "../controllers/ticket.controller.js";

const router = express.Router();

// Submit a new ticket
router.post("/ticket", submitTicket);

export default router;