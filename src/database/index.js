import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';
import User from '../models/User';
import Patient from '../models/Patient';

const Models = [User, Patient];

const connection = new Sequelize(dbConfig);

Models.forEach((model) => model.init(connection));

Models.forEach((model) => model.associate(connection.models));
