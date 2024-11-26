import connectionDB from "../database/connectionDB.js";
import { DataTypes } from "sequelize";

const userModel = connectionDB.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // Define los roles posibles
      allowNull: false,
      defaultValue: "user", // Asigna "user" como rol predeterminado
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

console.log(userModel === connectionDB.models.user); // true

export default userModel;
