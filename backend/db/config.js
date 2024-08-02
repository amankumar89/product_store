import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MongoDB URI is not defined');
    process.exit(1);
  }
  mongoose.connect(uri).then(() => {
    console.log('connected to database');
  }).catch ((err) => {
    console.error('error connecting to database', err);
    process.exit(1);
  })
}
