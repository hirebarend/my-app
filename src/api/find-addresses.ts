import axios from "axios";

export async function findAddresses(address: string): Promise<Array<string>> {
  const response = await axios.post<{
    predictions: Array<{ description: string }>;
  }>("https://startup-55-function-app.azurewebsites.net/api/v1/cors", {
    config: {
      params: {
        input: address,
        key: "AIzaSyA6WNw8PYvsig9g-I0j6_tEuegSiPUZfuE",
        location: "-33.9142688,18.0956051",
        radius: "50000",
        strictbounds: "true",
      },
    },
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
  });

  return response.data.predictions.map((x) => x.description);
}
