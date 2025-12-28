import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

// const STRING_DB = process.env.STRING_DB;
const { MYSQLUSER, MYSQLPASSWORD, MYSQLHOST, MYSQLPORT, MYSQLDATABASE } = process.env;
const STRING_DB = `mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`;

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
// sequelize.sync();

export default sequelize;
