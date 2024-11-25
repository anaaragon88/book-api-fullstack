export const handleHttpError = (
  res,
  message = "Ups I did it again 😅!",
  code = 403
) => {
  res.status(code);
  res.send({ error: message });
};
