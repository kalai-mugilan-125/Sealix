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

  // 🚨 FIX 3: Accept 'requestedRole' as a parameter
  async loginUser(email: string, password: string, requestedRole: string) { 
    // 1. Find user by email, including their Role
    const user = await User.findOne({ where: { email }, include: [Role] });
    
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    
    // 2. Check password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    // Safely access the role name
    if (!user.role || !user.role.name) {
        throw new Error('User role name is missing from the database record.');
    }
    
    const actualRole = user.role.name; 

    // 🚨 CRITICAL FIX 4: Validate that the requested role matches the actual role
    if (actualRole.toLowerCase() !== requestedRole.toLowerCase()) {
      throw new Error(`Access Denied: Your account is registered as '${actualRole}', not as '${requestedRole}'. Please select the correct role.`);
    }

    // 3. Generate the token
    const token = generateToken({ id: user.id, role: actualRole });
    
    // 4. Construct the clean, flat user object for the frontend
    const userForFrontend = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: actualRole, // Clean role string
    };
    
    // 5. Return the token and the clean user object
    return { token, user: userForFrontend };
  }
};