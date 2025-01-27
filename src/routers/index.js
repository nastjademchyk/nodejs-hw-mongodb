import { Router } from "express";
import contactsRouter from "../routers/contacts.js";
import authRouter from "../routers/auth.js";

const router = Router();
router.use("/contacts", contactsRouter);
router.use("/auth", authRouter);

export default router;
