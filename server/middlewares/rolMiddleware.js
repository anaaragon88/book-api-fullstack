import { handleHttpError } from "../utils/handleError.js";

export const checkRol = (reqRol) => (req, res, next) => {
  try {
    const { user } = req;

    // Verificamos que el usuario tenga roles definidos
    if (!user || !user.role) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    console.log({ user });
    const rolesByUser = user.role;
    //compara los arrays y mira si incluye el rol que tiene el usuario con sesión iniciada
    const checkValueRol = reqRol.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISSIONS");
    }
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
  next();
};
