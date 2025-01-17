import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get("/contacts", ctrlWrapper(getContactsController));

router.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));

router.post("/contacts", ctrlWrapper(createContactController));

router.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));

router.patch("/contacts/:contactId", ctrlWrapper(patchContactController));

export default router;
