import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Username should be a string",
    "string.min": "Username should have at least 3 characters",
    "string.max": "Username should have at most 20 characters",
    "any.required": "Username is required",
  }),
  phoneNumber: Joi.number().required(),
  email: Joi.string().required(),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.number(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string(),
});
