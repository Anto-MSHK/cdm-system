import { AppConfigurator } from "@configurators/index";
import dotenv from "dotenv";
import Book from "src/Models/Book";
import Client from "src/Models/Client";
import Chapter from "src/Models/Chapter";

dotenv.config();

AppConfigurator([Book, Client, Chapter], {
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
