const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");

const Administrador = sequelize.define("Administrador",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "administradores",
    timestamps: true
  }
);

module.exports = Administrador;