import connectionDB from "../database/connectionDB.js";
import { DataTypes } from "sequelize";
import userModel from "./userModel.js";

const bookModel = connectionDB.define(
  "Book",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "books",
    timestamps: false,
  }
);

//console.log(bookModel === connectionDB.models.book); // true
userModel.hasMany(bookModel, { foreignKey: "user_id" });
bookModel.belongsTo(userModel, { foreignKey: "user_id" });

export default bookModel;
