import axios from "axios";
import { useMutation } from "react-query";
import * as uuid from "uuid";
import { useGeolocation } from "../hooks";
import { Coordinates } from "../types";

export function Tracking() {
  const { geolocationPosition } = useGeolocation();

  const useMutationResult = useMutation(
    [],
    async (coordinates: Coordinates) => {
      await axios.post(
        "https://api.airtable.com/v0/appGhvX68c1Mnl86W/Gas%20Find",
        {
          records: [
            {
              fields: {
                ID: uuid.v4(),
                Latitude: coordinates.latitude,
                Longitude: coordinates.longitude,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer keywUEWZniOrHqDgC`,
          },
        }
      );
    }
  );

  if (!geolocationPosition) {
    return <></>;
  }

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="font-bold text-2xl">Tracking</div>
        <div className="text-gray-500 text-base">
          Accuracy:{" "}
          {new Intl.NumberFormat("en-ZA", {
            maximumFractionDigits: 1,
          }).format(geolocationPosition.coords.accuracy)}
          m
        </div>
        <div className="text-gray-500 text-base">
          Latitude:{" "}
          {new Intl.NumberFormat("en-ZA", {
            maximumFractionDigits: 4,
          }).format(geolocationPosition.coords.latitude)}
        </div>
        <div className="text-gray-500 text-base">
          Longitude:{" "}
          {new Intl.NumberFormat("en-ZA", {
            maximumFractionDigits: 4,
          }).format(geolocationPosition.coords.longitude)}
        </div>
        <div className="text-gray-500 text-base">
          Speed:{" "}
          {geolocationPosition.coords.speed
            ? new Intl.NumberFormat("en-ZA", {
                maximumFractionDigits: 1,
              }).format(geolocationPosition.coords.speed)
            : 0}
          m/s
        </div>
      </div>

      <button
        disabled={
          geolocationPosition.coords.accuracy > 15 ||
          useMutationResult.isLoading
        }
        className="bg-primary disabled:opacity-75 font-medium mt-4 p-2 rounded-lg text-base text-white w-full"
        onClick={() =>
          useMutationResult.mutate({
            latitude: geolocationPosition.coords.latitude,
            longitude: geolocationPosition.coords.longitude,
          })
        }
      >
        Submit
      </button>
    </div>
  );
}
