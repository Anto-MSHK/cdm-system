import { ModelConfig } from "@decorators/models/modelConfig/modelConfig";
import { Field } from "@decorators/models/field/field";
import { FieldType } from "@decorators/models/_types";
import { Scope } from "src/Scope";
import { Model } from "@models/Model";
import { HasMany } from "@decorators/models/relationships/hasMany";
import { HasOne } from "@decorators/models/relationships/hasOne";
import BookReview from "./BookReview";

@ModelConfig({ modelLabel: "Выдача книг" })
export class Loan extends Model {
  @Field({ type: FieldType.DATE, label: "Выдана" })
  loan: string | undefined;

  @Field({ type: FieldType.DATE, label: "Возврат" })
  due: string | undefined;

  @Field({ type: FieldType.DATE, label: "Фактический возврат" })
  fact_due_date: string | undefined;

  @HasOne({ model: Scope.Book })
  book: any;

  @HasOne({ model: Scope.Reader })
  reader: any;

  @HasMany({ model: Scope.BookReview })
  bookReview: any;
}

export default new Loan();
