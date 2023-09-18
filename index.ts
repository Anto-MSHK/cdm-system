import "reflect-metadata";

import { ContactModel } from "@decorators/models/contact";
import { Field } from "@decorators/models/field";
import { ATTRIBUTES_KEY, CONTACT_MODEL_NAME_KEY } from "@decorators/constants";

@ContactModel()
class Book {
  @Field({ type: "Anton" })
  name: string | undefined;
  @Field({ type: "Krut" })
  ISBN: string | undefined;
}

let obj = new Book();

const a = Reflect.getMetadata(CONTACT_MODEL_NAME_KEY, obj);
const b = Reflect.getMetadata(ATTRIBUTES_KEY, obj);
console.log(a);
console.log(b);
