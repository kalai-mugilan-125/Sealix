import { User } from '../models/User';
import { Document } from '../models/Document';
import { Role } from '../models/Role';

export const userService = {
  async getUserProfile(userId: number) {
    const user = await User.findByPk(userId, {
      include: [
        { model: Role, attributes: ['name'] },
        { model: Document }
      ]
    });
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  },

  async updateUserProfile(userId: number, data: any) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    await user.update(data);
    return user;
  }
};