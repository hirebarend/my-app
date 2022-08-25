import { calculateHaversineDistance } from "../functions";
import { Coordinates } from "../types";
import { DATA } from "./data";

export async function findItems(coordinates: Coordinates | null): Promise<
  Array<{
    address: string;
    coordinates: [number, number];
    inStock: boolean;
    isStockist: boolean;
    reference: string;
    name: string;
  }>
> {
  if (!coordinates) {
    return DATA;
  }

  return DATA.sort((a, b) => {
    return (
      calculateHaversineDistance(
        [coordinates.latitude, coordinates.longitude],
        a.coordinates
      ) -
      calculateHaversineDistance(
        [coordinates.latitude, coordinates.longitude],
        b.coordinates
      )
    );
  });
}
