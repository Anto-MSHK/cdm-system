import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { HasMany } from "@decorators/models/relationships/hasMany";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { RoutesConfig } from "@decorators/routes/routesConfig/routesConfig";
import { CREATE, GET_ALL, UPDATE } from "@decorators/routes/_constants";

@ModelConfig()
@RoutesConfig<Book>([CREATE(["ISBN", "name"]), UPDATE(["name"])])
class Book extends Model {
  @Field({ type: FieldType.STRING })
  name: string | undefined;
  @Field({ type: FieldType.STRING })
  ISBN: string | undefined;

  @HasMany({ model: Scope.Client })
  clients: string | undefined;
}

export default new Book();
