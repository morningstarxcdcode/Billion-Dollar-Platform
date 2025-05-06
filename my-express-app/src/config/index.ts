export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  env: process.env.NODE_ENV || 'development',
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  corsOrigin: process.env.CORS_ORIGIN || '*', // Add this line
};
