import dotenv from 'dotenv';

// dotenv.config();

import './src/database';

import express from 'express';
import homeRoutes from './src/routes/home';
import userRoutes from './src/routes/userRoutes';
import fotoRoutes from './src/routes/fotoRoutes';
import measurementRoutes from './src/routes/measurementRoutes';
import tokenRoutes from './src/routes/tokenRoutes';
import patientRoutes from './src/routes/patientRoutes';

class App {
  constructor() {
    dotenv.config();
    this.app = express();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
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
