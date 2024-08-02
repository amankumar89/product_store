import express from 'express'; 
import dotenv from 'dotenv';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// products 
app.use('/api/products', productRoutes);

app.listen(PORT, (error) => {
  if (error) return console.log('Error in running server', error);
  console.log(`Server is running at http://localhost:${PORT}`);
});