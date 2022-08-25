import { calculateHaversineDistance } from "../functions";
import { Coordinates, Item, Report } from "../types";
import { DATA } from "./data";
import { findReportsOutOfStock } from "./find-reports";

export async function findItems(
  coordinates: Coordinates | null
): Promise<Array<Item>> {
  const reports: Array<Report> = await findReportsOutOfStock(null);

  if (!coordinates) {
    return DATA.map((x) => {
      return {
        ...x,
        inStock:
          reports.filter((y) => y.reference === x.reference).length > 5
            ? false
            : x.inStock,
      };
    });
  }

  return DATA.map((x) => {
    return {
      ...x,
      inStock:
        reports.filter((y) => y.reference === x.reference).length > 5
          ? false
          : x.inStock,
    };
  }).sort((a, b) => {
    return (
      calculateHaversineDistance(
        [coordinates.latitude, coordinates.longitude],
        [a.coordinates.latitude, a.coordinates.longitude]
      ) -
      calculateHaversineDistance(
        [coordinates.latitude, coordinates.longitude],
        [b.coordinates.latitude, b.coordinates.longitude]
      )
    );
  });
}
