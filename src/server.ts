// server.ts
import express from 'express';
import { sequelize } from './utils/database/database';
import userRoutes from './routes/user.routes';
import {redFun} from '../src/utils/redis/redis'
import categoriesRoutes from './routes/categories.routes';
import productRoutes from './routes/product.routes'
import bidderRoutes from './routes/bidder.routes';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/users',userRoutes);
app.use('/categories',categoriesRoutes);
app.use('/products',productRoutes);
app.use('/bidder',bidderRoutes);
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    redFun();
    console.log(`Server is running on port ${PORT}`);
  });
});