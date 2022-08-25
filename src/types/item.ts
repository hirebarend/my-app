import { Coordinates } from "./coordinates";

export type Item = {
  address: string;

  contactNumber: string;

  coordinates: Coordinates;

  inStock: boolean;

  isStockist: boolean;

  reference: string;

  name: string;
};
