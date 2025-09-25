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
    // Includes the Role model to get the role name
    const user = await User.findOne({ where: { email }, include: [Role] });
    
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    // Safely access the role name
    if (!user.role || !user.role.name) {
        throw new Error('User role name is missing from the database record.');
    }
    
    const roleString = user.role.name; 

    // 1. Generate the token
    const token = generateToken({ id: user.id, role: roleString });
    
    // 2. FIX: Construct the clean, flat user object for the frontend
    const userForFrontend = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleString, // Clean role string
    };
    
    // 3. Return the token and the clean user object
    return { token, user: userForFrontend };
  }
};