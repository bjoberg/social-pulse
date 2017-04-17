const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/social-pulse',
  port: process.env.PORT || 8000,
};

export default config;
