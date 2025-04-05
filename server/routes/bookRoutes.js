import { Router } from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/bookController.js";

const bookRoutes = Router()
bookRoutes.get('/', getBooks)
bookRoutes.post('/', createBook)
bookRoutes.get('/:id', getBookById)
bookRoutes.put('/:id', updateBook)
bookRoutes.delete('/:id', deleteBook)

export default bookRoutes;