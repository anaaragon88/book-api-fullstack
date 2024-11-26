import connectionDB from "./database/connectionDB.js";
import express from "express";
import bookrouter from "./routes/routes.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import { PORT } from "./config.js";
import userModel from "./models/userModel.js";

export const app = express();
app.get("/hola", (req, res) => {
  res.send("Hola mundo 🚀");
});
app.use(express.json());
app.use(cors());
app.use("/books", bookrouter);
app.use("/auth", authRouter);

try {
  await connectionDB.authenticate();
  console.log("Conexión exitosa ✨");
  //cuando queramos actualizar la DB es necesario forzar la sincronización
  //await connectionDB.sync({ force: true });
  await connectionDB.sync();
  console.log("todo sincronizado ✨");
} catch (error) {
  console.error("Fallo fatal y muerte 💀", error);
}

export const server = app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT} 🚀 http://localhost:8000`);
});
