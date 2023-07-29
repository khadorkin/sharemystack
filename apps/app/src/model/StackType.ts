import { Model, Q } from "@nozbe/watermelondb";
import { date, lazy, readonly, text } from "@nozbe/watermelondb/decorators";

import { Tool } from "./Tool";
import { TableName } from "./schema";
import { Category } from "./Category";

export class StackType extends Model {
  static table = TableName.STACK_TYPES;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.STACK_TYPE_CATEGORIES]: {
      type: "has_many" as const,
      foreignKey: "stack_type_id",
    },
    [TableName.STACKS]: {
      type: "has_many" as const,
      foreignKey: "stack_type_id",
    },
  };

  @text("name") name!: string;
  @text("slug") slug!: string;
  @text("icon") icon!: string;
  @text("is_coming_soon") isComingSoon!: boolean;
  // @text("number_of_stacks") numberOfStacks!: number;

  @lazy
  categories = this.collections
    .get<Category>(TableName.CATEGORIES)
    .query(Q.on("stack_type_categories", "stack_type_id", this.id));
}
