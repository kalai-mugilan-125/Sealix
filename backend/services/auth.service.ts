import { User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { sequelize } from '../config/db';
import { Role } from '../models/Role';

export const authService = {
  async registerUser(name: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    const defaultRole = await Role.findOne({ where: { name: 'user' } });
    if (!defaultRole) {
      throw new Error('Default user role not found.');
    }
    const user = await User.create({ name, email, passwordHash: hashedPassword, roleId: defaultRole.id });
    return user;
  },

  async loginUser(email: string, password: string) {
    const user = await User.findOne({ where: { email }, include: [Role] });
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }
    const token = generateToken({ id: user.id, role: user.role.name });
    return { token, user };
  }
};