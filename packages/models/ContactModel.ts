import { Model } from "./Model";
import { Entity } from "@decorators/models/entity/entity";
import { Entities } from "@decorators/models/_types";

@Entity({ entity: Entities.CONTACT })
export class ContactModel extends Model {
  constructor() {
    super();
  }
}
