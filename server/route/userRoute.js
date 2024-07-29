import express from "express";
const router = express.Router();
import { authUser } from "../controller/userController.js";

router.get("/", authUser);
export default router;
