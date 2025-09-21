import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';
import { logger } from './config/logger';

const startServer = async () => {
  try {
    await connectDB();
    const PORT = env.PORT || 5000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

startServer();