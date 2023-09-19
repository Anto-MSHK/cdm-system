import { Model } from "./Model";
import { Entity } from "./../decorators/models/entity";
import { Entities } from "@decorators/_types";

@Entity({ entity: Entities.CONTACT })
export class ContactModel extends Model {}
