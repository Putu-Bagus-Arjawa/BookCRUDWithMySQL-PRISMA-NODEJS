import { Router } from "express";
import { createAuthor, getAuthors } from "../controllers/authorController.js";

const authorRoutes = Router();

authorRoutes.get('/', getAuthors)
authorRoutes.post('/', createAuthor)


export default authorRoutes;