import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { ContactModel } from "@models/ContactModel";
import { OnlyOneAt } from "@decorators/models/relationships/onlyOneAt";
import { Scope } from "src/Scope";
import Book = require("src/Models/Book");

@ModelConfig()
class Chapter extends ContactModel {
  @Field({ type: FieldType.STRING })
  title: string | undefined;

  @OnlyOneAt({ model: Scope.Book })
  book_id: string | undefined;
}

export default new Chapter();
