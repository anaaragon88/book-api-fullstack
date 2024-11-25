import dotenv from "dotenv";

dotenv.config();

export const DB_DEV_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.HOST;
export const NODE_ENV = process.env.NODE_ENV;
export const DB_TEST_NAME = process.env.DB_TEST_NAME;

export const PORT = process.env.NODE_ENV === "test" ? 6000 : 8000;
