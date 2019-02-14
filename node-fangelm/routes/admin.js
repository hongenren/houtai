'use strict';

import express from 'express';

import admin from '../controller/admin/admin'

const router = express.Router();

router.post('/login', admin.login);
router.post('/register', admin.register);


export default router