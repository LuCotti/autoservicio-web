import { Sequelize } from 'sequelize';
const stringDb = process.env.STRING_DB;
const sequelize = new Sequelize(stringDb);
sequelize.sync();

export default sequelize;