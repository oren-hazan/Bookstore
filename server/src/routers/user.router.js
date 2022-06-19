import express from 'express';
import userAuth from '../middlewares/user.auth.js';
import * as userController from '../controllers/user.controller.js'

const router = new express.Router();

router.post('/users/new', userController.createUser);

router.post('/users/login', userController.login);

router.post('/users/logout', userAuth, userController.logout)

router.patch('/users/:userID', userAuth, userController.updateUser);

router.delete('/users/:userID', userAuth, userController.deleteUser);

export default router;