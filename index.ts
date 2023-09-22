import { AppConfigurator } from "@configurators/index";
import dotenv from "dotenv";
import Book from "src/Models/Book";
import Client from "src/Models/Client";
import Chapter from "src/Models/Chapter";

dotenv.config();

console.log(Book._getConfig());
console.log(Client._getConfig());
console.log(Chapter._getConfig());
console.log(Book._getAllFields());
console.log(Client._getAllFields());
console.log(Chapter._getAllFields());

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
