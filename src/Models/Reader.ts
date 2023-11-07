import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType, R_CUSTOM, R_EMAIL } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";

@ModelConfig({ modelLabel: "Читатели" })
export class Reader extends Model {
  @Field({ type: FieldType.STRING, label: "Имя" })
  first_name: string | undefined;

  @Field({ type: FieldType.STRING, label: "Фамилия", isMainlabel: true })
  last_name: string | undefined;

  @Field({ type: FieldType.DATE, label: "Дата рождения" })
  birth: string | undefined;

  @Field({ type: FieldType.STRING, label: "Адрес" })
  address: string | undefined;

  @Field({ type: FieldType.STRING, label: "Почта", regex: R_EMAIL })
  email: string | undefined;

  @Field({
    type: FieldType.STRING,
    label: "Номер телефона",
    regex: R_CUSTOM(/(?:\+|\d)[\d\-\(\) ]{9,}\d/),
  })
  phone_number: string | undefined;
}

export default new Reader();
