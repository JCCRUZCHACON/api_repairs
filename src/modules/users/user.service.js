import { User } from './user.model.js';

export class UserService {
  async findAll() {
    return await User.findAll({
      where: {
        status: 'available',
      },
    });
  }

  async findOne(id) {
    return await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(user, data) {
    return await user.update(data);
  }

  async delete(user) {
    return await user.update({ status: 'disabled' });
  }
}
