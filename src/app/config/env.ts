import dotenv from "dotenv";
dotenv.config();
interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  JWT_ACCESS: string;
  JWT_ACCESS_EXPIRE: string;
  SUPER_ADMIN_PASS: string;
  SUPER_ADMIN_EMAIL: string;
  JWT_REFRESH_EXPIRE: string;
  JWT_REFRESH_SECRET: string;
}

const loadEnv = (): EnvConfig => {
  const requireMent: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_ACCESS_EXPIRE",
    "JWT_ACCESS",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASS",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRE",
  ];

  requireMent.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing Env ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV!,
    JWT_ACCESS: process.env.JWT_ACCESS as string,
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  };
};

export const envVars = loadEnv();
