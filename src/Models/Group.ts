import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { HasMany } from "@decorators/models/relationships/hasMany";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";

@ModelConfig({ modelLabel: "Группы книг" })
export class Group extends Model {
  @Field({ type: FieldType.STRING, label: "Название" })
  name: string | undefined;
  @HasMany({ model: Scope.Book })
  books: string | undefined;
}

export default new Group();
