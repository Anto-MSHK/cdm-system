import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasOne } from "@decorators/models/relationships/hasOne";

@ModelConfig()
class Chapter extends Model {
  @Field({ type: FieldType.STRING })
  title: string | undefined;

  @HasOne({ model: Scope.Book })
  book: string | undefined;
}

export default new Chapter();
