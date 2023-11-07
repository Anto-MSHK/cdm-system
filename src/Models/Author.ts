import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";
import { HasOne } from "@decorators/models/relationships/hasOne";

@ModelConfig({ modelLabel: "Авторы" })
export class Author extends Model {
  @Field({ type: FieldType.STRING, label: "Имя" })
  first_name: string | undefined;

  @Field({ type: FieldType.STRING, label: "Фамилия", isMainlabel: true })
  last_name: string | undefined;

  @Field({ type: FieldType.DATE, label: "Дата рождения" })
  birth: string | undefined;

  @HasOne({ model: Scope.Biography })
  biography: any;

  @HasMany({ model: Scope.Book })
  books: any;
}

export default new Author();
