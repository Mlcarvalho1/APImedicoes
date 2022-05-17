import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';
import users from '../models/User';
import patients from '../models/Patient';

const models = [users, patients];

const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));
