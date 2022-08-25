import { DATA } from "./data";

export async function findItem(reference: string): Promise<{
  address: string;
  coordinates: [number, number];
  inStock: boolean;
  isStockist: boolean;
  reference: string;
  name: string;
}> {
  const item = DATA.find((x) => x.reference === reference);

  if (!item) {
    throw new Error();
  }

  return item;
}
