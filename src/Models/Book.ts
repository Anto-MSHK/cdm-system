import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { ContactModel } from "@models/ContactModel";
import { ManyAt } from "@decorators/models/relationships/manyAt";
import { Scope } from "src/Scope";
import Client from "./Client";

@ModelConfig()
class Book extends ContactModel {
  @Field({ type: FieldType.STRING })
  name: string | undefined;
  @Field({ type: FieldType.STRING })
  ISBN: string | undefined;

  @ManyAt({ model: Scope.Client })
  client_id: string | undefined;
}

export default new Book();
