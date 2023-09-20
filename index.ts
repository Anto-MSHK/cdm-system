import { AppConfigurator } from "@configurators/index";
import Book from "src/Book";
import dotenv from "dotenv";

dotenv.config();

AppConfigurator([Book], {
  serverPort: process.env.SERVER_PORT as any,
  database: {
    dialect: "postgres",
    host: process.env.DB_HOST as any,
    port: process.env.DB_PORT as any,
    username: process.env.DB_USER as any,
    password: process.env.DB_PASS as any,
    database: process.env.DB_NAME as any,
  },
});
