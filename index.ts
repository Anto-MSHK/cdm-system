import { AppConfigurator } from "@configurators/index";
import dotenv from "dotenv";
import Author from "src/Models/Author";
import Biography from "src/Models/Biography";
import Book from "src/Models/Book";
import BookReview from "src/Models/BookReview";
import Genre from "src/Models/Genre";
import Language from "src/Models/Language";
import Loan from "src/Models/Loan";
import Location from "src/Models/Location";
import Publisher from "src/Models/Publisher";
import Reader from "src/Models/Reader";

dotenv.config();

AppConfigurator(
  [
    Book,
    Author,
    Publisher,
    Biography,
    BookReview,
    Genre,
    Language,
    Loan,
    Location,
    Reader,
  ],
  {
    serverPort: process.env.SERVER_PORT as any,
    database: {
      dialect: "postgres",
      host: process.env.DB_HOST as any,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USER as any,
      password: process.env.DB_PASS as any,
      database: process.env.DB_NAME as any,
    },
  }
);
