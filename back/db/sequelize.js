import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

// const STRING_DB = process.env.STRING_DB;
const { MYSQL_PUBLIC_URL } = process.env;
const STRING_DB = MYSQL_PUBLIC_URL;

const sequelize = new Sequelize(STRING_DB, {
  dialect: 'mysql',
  dialectModule: mysql2,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
sequelize.sync({ alter: true });

export default sequelize;
