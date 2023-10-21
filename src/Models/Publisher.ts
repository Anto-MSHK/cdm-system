import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType, R_EMAIL } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";

@ModelConfig({ modelLabel: "Издательства" })
export class Publisher extends Model {
  @Field({ type: FieldType.STRING, label: "Название" })
  name: string | undefined;

  @Field({ type: FieldType.STRING, label: "Адрес" })
  address: string | undefined;

  @Field({ type: FieldType.STRING, label: "Сайт" })
  website: string | undefined;

  @Field({ type: FieldType.STRING, label: "Почта", regex: R_EMAIL })
  email: string | undefined;

  @Field({ type: FieldType.DATE, label: "Дата основания" })
  founding: string | undefined;

  @HasMany({ model: Scope.Book })
  books: any;
}

export default new Publisher();
