import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js'; // .js extension lagana mat bhoolna

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));