import { Sequelize } from 'sequelize';
const stringDb = process.env.STRING_DB;
const sequelize = new Sequelize(stringDb, { dialectModule: require('mysql2') });
sequelize.sync();

export default sequelize;
