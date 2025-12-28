import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize(process.env.STRING_DB, {
  dialect: 'mysql',
  dialectModule: mysql2,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
// sequelize.sync({ alter: true });

export default sequelize;
