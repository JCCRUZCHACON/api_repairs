import { Router } from 'express';

export const router = Router();

import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  updateUser,
} from './user.controller.js';
import { validExistUser } from './user.middleware.js';

router.route('/')
.get(findAllUsers)
.post(createUser);

router.use('/:id', validExistUser)

router.route('/:id')
.get(findOneUser)
.patch(updateUser)
.delete(deleteUser);
