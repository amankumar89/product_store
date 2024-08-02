import express from 'express'; 
import dotenv from 'dotenv';
import productRoutes from './routes/product.route.js';
import connectDB from './db/config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// products routes
app.use('/api/products', productRoutes);

app.listen(PORT, async (error) => {
  if (error) return console.log('Error in running server', error);
  await connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});