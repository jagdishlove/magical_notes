import { cleanEnv, str, num } from "envalid";

export const env = cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: num(),
});
