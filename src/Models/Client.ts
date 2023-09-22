import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { ContactModel } from "@models/ContactModel";
import { ManyAt } from "@decorators/models/relationships/manyAt";
import { Scope } from "src/Scope";
import Chapter from "./Chapter";

@ModelConfig()
class Client extends ContactModel {
  @Field({ type: FieldType.STRING })
  name: string | undefined;
  @ManyAt({ model: Scope.Chapter })
  chapter_id: string | undefined;
}

export default new Client();
