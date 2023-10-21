import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";

@ModelConfig({ modelLabel: "Местонахождение" })
export class Location extends Model {
  @Field({ type: FieldType.STRING, label: "Комната" })
  room: string | undefined;
  @Field({ type: FieldType.STRING, label: "Стеллаж" })
  rack: string | undefined;
  @Field({ type: FieldType.STRING, label: "Полка" })
  shelf: string | undefined;
}

export default new Location();
