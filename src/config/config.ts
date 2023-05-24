export const config = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGODB_HOST,
  },
  aws: {
    endpoint: process.env.AWS_ENDPOINT,
    id: process.env.AWS_ID,
    secret: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
  },
});
