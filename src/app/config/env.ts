import dotenv from "dotenv";
dotenv.config();
interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
}

const loadEnv = (): EnvConfig => {
  const requieMent: string[] = ["PORT", "DB_URL", "NODE_ENV"];

  requieMent.forEach(key=>{
    if (!process.env[key]) {
        throw new Error(`Missing Env ${key}`)
    }
  })

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL! ,
    NODE_ENV: process.env.NODE_ENV!,
  };
};

export const envVars =loadEnv();
