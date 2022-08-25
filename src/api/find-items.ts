import { calculateHaversineDistance } from "../functions";
import { Coordinates, Report } from "../types";
import { DATA } from "./data";
import { findReportsOutOfStock } from "./find-reports";

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
        a.coordinates
      ) -
      calculateHaversineDistance(
        [coordinates.latitude, coordinates.longitude],
        b.coordinates
      )
    );
  });
}
