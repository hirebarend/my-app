import { Item } from "../types";
import { findItems } from "./find-items";

export async function findItem(reference: string): Promise<Item> {
  const items = await findItems(null);

  const item = items.find((x) => x.reference === reference);

  if (!item) {
    throw new Error();
  }

  return item;
}
