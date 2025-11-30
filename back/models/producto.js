import sequelize from '../db/sequelize.js';
import { DataTypes } from 'sequelize';


const Producto = sequelize.define("Producto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    categoria: {
      type: DataTypes.ENUM("Farol", "Plafon"),
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: "productos",
    timestamps: true,
    createdAt: true,
    updatedAt: true
  }
);

export default Producto;