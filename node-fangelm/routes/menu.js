'use strict';

import express from 'express';

import menugory from '../controller/menu/menu'

const router = express.Router();

router.get('/menuList', menugory.getmenu);


export default router