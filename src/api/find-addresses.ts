import { AxiosWildcardCors } from "./axios-wildcard-cors";

export async function findAddresses(address: string): Promise<Array<string>> {
  const response = await AxiosWildcardCors.get<{
    predictions: Array<{ description: string }>;
  }>("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
    params: {
      input: address,
      key: "AIzaSyA6WNw8PYvsig9g-I0j6_tEuegSiPUZfuE",
      location: "-33.9142688,18.0956051",
      radius: "50000",
      strictbounds: "true",
    },
  });

  return response.data.predictions.map((x) => x.description);
}
