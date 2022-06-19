import express from 'express';
import userAuth from '../middlewares/user.auth.js';
import * as cartController from '../controllers/cart.controller.js';

const router = new express.Router();

router.get('/cart', userAuth, cartController.showCart);

router.patch('/cart/add-to-cart', userAuth, cartController.addToCart);

router.delete('/cart', userAuth, cartController.deleteFromCart);

router.patch('/cart/checkout', userAuth, cartController.checkOut)

export default router;
