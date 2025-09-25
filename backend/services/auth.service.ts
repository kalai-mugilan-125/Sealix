import { User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { sequelize } from '../config/db';
import { Role } from '../models/Role';

export const authService = {
  async registerUser(name: string, email: string, password: string, role: string) {
    const hashedPassword = await hashPassword(password);
    
    // Find the role based on the input from the frontend
    const userRole = await Role.findOne({ where: { name: role } });
    if (!userRole) {
      throw new Error('User role not found.');
    }

    const user = await User.create({ name, email, passwordHash: hashedPassword, roleId: userRole.id });
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