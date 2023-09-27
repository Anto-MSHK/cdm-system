import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { HasMany } from "@decorators/models/relationships/hasMany";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";

@ModelConfig()
class Client extends Model {
  @Field({ type: FieldType.STRING })
  name: string | undefined;
  @HasMany({ model: Scope.Chapter })
  chapters: string | undefined;
}

export default new Client();
