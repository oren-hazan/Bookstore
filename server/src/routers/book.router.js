import express from 'express';
import * as booksController from '../controllers/book.controller.js'
import adminAuth from '../middlewares/admin.auth.js';

const router = new express.Router();

router.get('/books', booksController.getAllBooks);

router.get('/books/:bookID', booksController.getBookById);

router.post('/books/new', adminAuth, booksController.createBook);

router.patch('/books/:bookID', adminAuth, booksController.updateBook);

router.delete('/books/:bookID', adminAuth, booksController.deleteBook);

export default router;
