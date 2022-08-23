import { AxiosWildcardCors } from "./axios-wildcard-cors";
import { calculateHaversineDistance } from "../functions";
import { DATA } from "./data";

export async function findViewModel(address: string): Promise<{
  address: string;
  coordinates: [number, number];
  items: Array<{
    address: string;
    coordinates: [number, number];
    inStock: boolean;
    name: string;
  }>;
} | null> {
  const response = await AxiosWildcardCors.get<{
    results: Array<{ geometry: { location: { lat: number; lng: number } } }>;
  }>("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      address,
      key: "AIzaSyA6WNw8PYvsig9g-I0j6_tEuegSiPUZfuE",
    },
  });

  if (!response.data.results.length) {
    return null;
  }

  const coordinates: [number, number] = [
    response.data.results[0].geometry.location.lat,
    response.data.results[0].geometry.location.lng,
  ];

  return {
    address,
    coordinates,
    items: DATA.sort((a, b) => {
      return (
        calculateHaversineDistance(coordinates, a.coordinates) -
        calculateHaversineDistance(coordinates, b.coordinates)
      );
    }),
  };
}
