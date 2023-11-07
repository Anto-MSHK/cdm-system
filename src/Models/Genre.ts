import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";

@ModelConfig({ modelLabel: "Жанры" })
export class Genre extends Model {
  @Field({ type: FieldType.STRING, label: "Название", isMainlabel: true  })
  name: string | undefined;
}

export default new Genre();
