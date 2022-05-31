import dotenv from 'dotenv';
import cors from 'cors';

// dotenv.config();

import './backend/src/database';

import express from 'express';
import homeRoutes from './backend/src/routes/home';
import userRoutes from './backend/src/routes/userRoutes';
import fotoRoutes from './backend/src/routes/fotoRoutes';
import measurementRoutes from './backend/src/routes/measurementRoutes';
import tokenRoutes from './backend/src/routes/tokenRoutes';
import patientRoutes from './backend/src/routes/patientRoutes';

class App {
  constructor() {
    dotenv.config();
    this.app = express();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/patients', patientRoutes);
    this.app.use('/fotos', fotoRoutes);
    this.app.use('/patients/measurements', measurementRoutes);
  }

  setup() {
    this.middlewares();
    this.routes();
    this.app.listen(3000, () => console.log('Funcionando'));
  }
}

export default new App();
