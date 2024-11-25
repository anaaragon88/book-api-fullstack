import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import { encrypt, compare } from "../utils/handlePassword.js";
import { handleHttpError } from "../utils/handleError.js";
import { tokenSign } from "../utils/handleJwt.js";
dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el email y nombre ya existen en la base de datos
    const existingUserByEmail = await userModel.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    const existingUserByName = await userModel.findOne({ where: { name } });
    if (existingUserByName) {
      return res.status(409).json({ message: "El nombre ya está en uso" });
    }

    // Encriptar la contraseña
    const hashedPassword = await encrypt(password);

    // Crear nuevo usuario
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    await userModel.create(newUser);

    res.status(201).json({ message: `${newUser.name} creado exitosamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const loginController = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const loginPassword = req.body.password;

    const user = await userModel.findOne({ where: { email: userEmail } });
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    const hashPassword = user.password;
    console.log(hashPassword);
    const check = await compare(loginPassword, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    const sesiondata = {
      token: await tokenSign(user),
      user: user,
    };

    res.send({ sesiondata });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

/*export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "100h",
    });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};*/
