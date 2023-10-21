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
import { HasMany } from "@decorators/models/relationships/hasMany";
import Genre from "./Genre";
import Publisher from "./Publisher";

@ModelConfig({ modelLabel: "Книги" })
class Book extends Model {
  @Field({ type: FieldType.STRING, label: "Название" })
  title: string | undefined;

  @Field({ type: FieldType.STRING, label: "Международный номер книги" })
  ISBN: string | undefined;

  @HasMany({ model: Scope.BookReview })
  reviews: any;

  @HasOne({ model: Scope.Genre })
  genre: any;

  @HasOne({ model: Scope.Publisher })
  publisher: any;

  @HasOne({ model: Scope.Language })
  language: any;

  @HasOne({ model: Scope.Location })
  location: any;
}
export default new Book();
