import { body, check } from "express-validator";
import { validateResult } from "./helperValidator.js";

export const validateCreateBook = [
  body("title").notEmpty().withMessage("El título es obligatorio"),
  body("author").notEmpty().withMessage("El autor es obligatorio"),
  body("description").notEmpty().withMessage("La descripción es obligatoria"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

/*export const validateUpdateBook = [
  check("title")
    .optional()
    .notEmpty()
    .withMessage("El título no debe estar vacío"),
  check("author")
    .optional()
    .notEmpty()
    .withMessage("El autor no debe estar vacío"),
  check("description")
    .optional()
    .notEmpty()
    .withMessage("La descripción no debe estar vacía"),
  check("id")
    .exists()
    .notEmpty()
    .withMessage("El ID es obligatorio")
    .custom(async (id) => {
      const book = await bookModel.findByPk(id);
      if (!book) {
        throw new Error("El libro que deseas actualizar no existe.");
      }
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];*/
