import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import accontRoutes from './routes/accountRoutes';

import cors from 'cors';

dotenv.config();

const app = express();
const corsOptions = {
    origin: '*' // Replace with your desired origin(s)
  };
  app.use(cors(corsOptions));
const port = process.env.PORT || 3000;

app.use(express.json());
// Add routes
app.use('/api/accounts', accontRoutes);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        await sequelize.sync({ alter: true }); // Sync models with the database

        await app.listen({
            port: 3000,
        });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
};

start();
