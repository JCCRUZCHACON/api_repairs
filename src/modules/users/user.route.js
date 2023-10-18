import { Router } from 'express';

export const router = Router();

import {
  changePassword,
  createUser,
  deleteAccount,
  deleteUser,
  findAllUsers,
  findOneUser,
  login,
  register,
  updateUser,
} from './user.controller.js';
import { protect, protectAccountOwner, restrictTo, validExistUser } from './user.middleware.js';

router.route('/')
.get(findAllUsers)
.post(createUser);

router.use('/:id', validExistUser)

router.route('/:id')
.get(findOneUser)
.patch(updateUser)
.delete(deleteUser);



router.post('/login', login)

router.post('/register', protect, restrictTo('developer'), register)

router.patch('/change-password', protect, changePassword)

router.delete('/:id', protect, validExistUser, protectAccountOwner ,deleteAccount)