import express from 'express'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.send("Hello from product store server");
})

app.listen(PORT, (error) => {
  if (error) return console.log('Error in running server', error);
  console.log(`Server is running at http://localhost:${PORT}`);
});