import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { TableName } from "@/model/schema";
import { Category } from "@/model/Category";

export function useCategories() {
  const database = useDatabase();
  const [categories, setCategories] = useState<Category[]>();

  const categoriesQuery = database.collections
    .get<Category>(TableName.CATEGORIES)
    .query();

  useEffect(() => {
    const subscription = categoriesQuery.observe().subscribe((data) => {
      setCategories(data ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { categories };
}
