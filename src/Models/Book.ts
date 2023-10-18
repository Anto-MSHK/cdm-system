import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { HasOne } from "@decorators/models/relationships/hasOne";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { RoutesConfig } from "@decorators/routes/routesConfig/routesConfig";
import {
  CREATE,
  GET_ALL,
  GET_ONE,
  UPDATE,
} from "@decorators/routes/_constants";

@ModelConfig({ modelLabel: "Книги" })
@RoutesConfig<Book>([GET_ALL(), GET_ONE(), UPDATE(["title"])])
class Book extends Model {
  @Field({ type: FieldType.STRING, label: "Название" })
  title: string | undefined;

  @HasOne({ model: Scope.Author })
  author: string | undefined;
}

export default new Book();
