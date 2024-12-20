import express from "express";
import {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
  getOneBook,
} from "../controllers/bookController.js";
import { validateCreateBook } from "../validators/bookValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkRol } from "../middlewares/rolMiddleware.js";

const bookrouter = express.Router();

bookrouter.get("/", authMiddleware, checkRol(["admin"]), getAllBooks);
bookrouter.get("/:id", getOneBook);
bookrouter.post("/", validateCreateBook, createBook);
bookrouter.delete("/:id", deleteBook);
bookrouter.put("/:id", updateBook);

export default bookrouter;
