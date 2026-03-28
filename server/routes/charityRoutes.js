import express from "express";
import { fetchCharities } from "../controllers/charityController.js";

const router = express.Router();

router.get("/", fetchCharities);

export default router;