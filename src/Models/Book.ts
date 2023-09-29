import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { HasOne } from "@decorators/models/relationships/hasOne";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { RoutesConfig } from "@decorators/routes/routesConfig/routesConfig";
import { CREATE, GET_ALL, UPDATE } from "@decorators/routes/_constants";

@ModelConfig()
@RoutesConfig<Book>([CREATE(["name"]), UPDATE(["name"])])
class Book extends Model {
  @Field({ type: FieldType.STRING })
  name: string | undefined;

  @HasOne({ model: Scope.Author })
  author: string | undefined;
}

export default new Book();
