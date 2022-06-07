import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';
import User from '../models/User';
import Patient from '../models/Patient';
import ProfilePics from '../models/ProfilePics';
import Measurement from '../models/Measurement';

const Models = [User, Patient, ProfilePics, Measurement];

const connection = new Sequelize(dbConfig);

Models.forEach((model) => model.init(connection));

Models.forEach((model) => model.associate && model.associate(connection.models));
