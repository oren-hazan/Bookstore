import express from 'express';
import * as booksController from '../controllers/book.controller.js'

const router = new express.Router();

router.post('/books/new', booksController.createBook);

router.get('/books/:bookID', booksController.getBookById)

router.get('/books', booksController.getAllBooks)

export default router;
