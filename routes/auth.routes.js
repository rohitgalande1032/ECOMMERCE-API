import express from "express";
const router = express.Router();
import { signUp, login, logout, users } from "../controllers/auth.controller.js";


router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", logout)

router.get("/users", users)


export default router;