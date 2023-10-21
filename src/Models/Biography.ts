import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";
import { HasOne } from "@decorators/models/relationships/hasOne";

@ModelConfig({ modelLabel: "Биографии" })
export class Biography extends Model {
  @Field({ type: FieldType.STRING, label: "Содержание" })
  info: string | undefined;

  @Field({ type: FieldType.STRING, label: "Национальность" })
  nationality: string | undefined;

  @Field({ type: FieldType.STRING, label: "Сайт" })
  website: string | undefined;

  @HasOne({ model: Scope.Author })
  author: any;
}

export default new Biography();
