import { Sequelize } from 'sequelize-typescript';
import { env } from './env';
import { User } from '../models/User';
import { Document } from '../models/Document';
import { Verification } from '../models/Verification';
import { Role } from '../models/Role';
import { logger } from './logger';

export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  models: [User, Document, Verification, Role],
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
    await sequelize.sync({ alter: true });
    logger.info('Database synchronized.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
};