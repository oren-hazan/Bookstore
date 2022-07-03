import express from 'express';
import adminAuth from '../middlewares/admin.auth.js';
import * as adminController from '../controllers/admin.controller.js';

const router = new express.Router();

router.post('/admin/new', adminAuth, adminController.createAdmin);

router.post('/admin/login', adminController.login);

router.post('/admin/logout', adminAuth, adminController.logout);

export default router;
