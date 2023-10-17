import { Router } from 'express';

export const router = Router();

import {
    findAllRepairs,
    createRepair,
    findOneRepairs,
    updateRepair,
    deleteRepair
} from './repairs.controller.js';
import { validRepair } from './repairs.middleware.js';


router.route('/')
.get(findAllRepairs)
.post(createRepair);

router.use('/:id', validRepair)

router.route('/:id')
.get(findOneRepairs)
.patch(updateRepair)
.delete(deleteRepair);
