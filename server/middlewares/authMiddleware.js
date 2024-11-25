import { handleHttpError } from "../utils/handleError.js";
import { verifyToken } from "../utils/handleJwt.js";
import UserModel from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    //primero, si no hay token que nos avise y nos mande un error
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }
    //1️⃣ENCONTRAR EL TOKEN
    //busca en las cabeceras el token y selecciona solo el string del token
    const token = req.headers.authorization.split(" ").pop();

    //2️⃣VERIFICARLO
    //con el handle que hemos creado *verifyToken()* ( que utiliza de la librería jwt) verificamos que es un token
    const dataToken = await verifyToken(token);

    // nuestra firma de token *tokenSign()* necesita un id para funcionar verificamos que esta y si no error.
    if (!dataToken.id) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    }
    if (!dataToken || !dataToken.id) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401); // Si el token es inválido o no contiene `id`
      return;
    }

    //a través del id que trae el token sacamos la información del usuario y la ponemos a disposición de las request que este usuario pueda hacer

    //además de para saber el rol, hacer esto nos permite tener un control de trazabilidad, es decir, saber que usuario ha hecho cada petición.

    // 3️⃣ Buscar al usuario en la base de datos
    const user = await UserModel.findByPk(dataToken.id); // Cambié de `findById` a `findByPk` porque Sequelize utiliza `findByPk`
    if (!user) {
      handleHttpError(res, "USER_NOT_FOUND", 404);
      return;
    }

    // 4️⃣ Adjuntar la información del usuario al objeto `req` para uso futuro
    req.user = user;

    // 5️⃣ Avanzar al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    handleHttpError(res, "NOT_SESSION", 401);
  }
};
