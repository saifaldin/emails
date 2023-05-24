export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGODB_HOST || 'mongodb://mongo:27017/emailer',
  },
  aws: {
    endpoint: process.env.AWS_ENDPOINT || 'http://localhost:4566',
    region: process.env.AWS_REGION || 'us-east-1',
    id: process.env.AWS_ID || 'id',
    secret: process.env.AWS_SECRET || 'secret',
  },
});
