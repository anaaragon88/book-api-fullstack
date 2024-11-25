import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  const errors = validationResult(req); //validationResult la crea express validator
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
