import { findItems } from "./find-items";

export async function findItem(reference: string): Promise<{
  address: string;
  coordinates: [number, number];
  inStock: boolean;
  isStockist: boolean;
  reference: string;
  name: string;
}> {
  const items = await findItems(null);

  const item = items.find((x) => x.reference === reference);

  if (!item) {
    throw new Error();
  }

  return item;
}
