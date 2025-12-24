import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const stringDb = process.env.STRING_DB;
const sequelize = new Sequelize(stringDb, { dialectModule: mysql2 });
sequelize.sync();

export default sequelize;
