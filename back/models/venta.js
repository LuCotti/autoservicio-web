const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");

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

module.exports = Venta;