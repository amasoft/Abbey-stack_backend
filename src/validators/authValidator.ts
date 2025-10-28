import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name cannot exceed 50 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
  }),

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 20 characters",
      "string.pattern.base": "Password must contain both letters and numbers",
      "string.empty": "Password is required",
    }),

 
});
