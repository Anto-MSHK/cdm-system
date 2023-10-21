import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";

@ModelConfig({ modelLabel: "Языки" })
export class Language extends Model {
  @Field({ type: FieldType.STRING, label: "Название" })
  language: string | undefined;
}

export default new Language();
