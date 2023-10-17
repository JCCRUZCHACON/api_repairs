import { UserService } from './user.service.js';

const userService = new UserService();

export const validExistUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.findOne(id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
