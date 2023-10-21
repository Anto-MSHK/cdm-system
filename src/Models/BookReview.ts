import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";
import { HasOne } from "@decorators/models/relationships/hasOne";

@ModelConfig({ modelLabel: "Рецензии" })
export class BookReview extends Model {
  @Field({ type: FieldType.STRING, label: "Текст" })
  text: string | undefined;

  @Field({ type: FieldType.DATE, label: "Дата" })
  date: string | undefined;

  @Field({ type: FieldType.NUMBER, label: "Рейтинг", min: 0, max: 5 })
  rating: string | undefined;

  @HasOne({ model: Scope.Book })
  book: any;

  @HasOne({ model: Scope.Reader })
  reader: any;
}

export default new BookReview();
