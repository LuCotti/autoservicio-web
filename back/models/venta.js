import sequelize from '../db/sequelize.js';
import { DataTypes } from 'sequelize';

const Venta = sequelize.define("Venta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCliente: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    precioTotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    tableName: "ventas",
    timestamps: true,
    createdAt: true,
    updatedAt: true
  }
);

export default Venta;