import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  loginUserSchema,
  loginWithGoogleOAuthSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getGoogleOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from "../controllers/auth.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post("/logout", ctrlWrapper(logoutUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

router.post(
  "/send-reset-email",
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);

router.post(
  "/reset-password",
  ctrlWrapper(resetPasswordController),
  validateBody(resetPasswordSchema)
);

router.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthUrlController));

router.post(
  "/confirm-oauth",
  ctrlWrapper(loginWithGoogleController),
  validateBody(loginWithGoogleOAuthSchema)
);
export default router;
