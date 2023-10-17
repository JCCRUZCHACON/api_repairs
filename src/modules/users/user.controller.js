import { UserService } from './user.service.js';

const userService = new UserService();

export const findAllUsers = async (req, res, next) => {
  try {
    const users = await userService.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const findOneUser = (req, res, next) => {
  try {
    const { user } = req;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { email, name} = req.body
    const { user } =req
    
    await userService.update(user, {email, name})

    return res.status(200).json(({
      message: 'user has been updated'

    }))
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { user } = req;
    await userService.delete(user);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};
