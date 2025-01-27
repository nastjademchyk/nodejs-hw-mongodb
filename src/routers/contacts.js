import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get("/", ctrlWrapper(getContactsController));

router.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post(
  "/register",
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

router.delete("/:contactId", ctrlWrapper(deleteContactController));

router.patch(
  "/:contactId",
  validateBody(updateContactSchema),
  isValidId,
  ctrlWrapper(patchContactController)
);

export default router;
