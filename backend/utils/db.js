import mongoose from 'mongoose';

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
    .then(() => {
      console.log('Database connected successfully');
      resolve();
    })
    .catch((error) => {
      console.error('Database connection failed:', error);
      reject(error);
    });
  });
};

export default connectDB;