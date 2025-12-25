import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const stringDb = process.env.STRING_DB;
const sequelize = new Sequelize(stringDb, {
  dialect: 'mysql',
  dialectModule: mysql2,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});
// sequelize.sync();

export default sequelize;
