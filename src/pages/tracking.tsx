import { useMutation } from "react-query";
import { useGeolocation } from "../hooks";
import { Coordinates } from "../types";

export function Tracking() {
  const { geolocationPosition } = useGeolocation();

  const useMutationResult = useMutation([], async (coordinates: Coordinates) =>
    Promise.resolve(true)
  );

  if (!geolocationPosition) {
    return <></>;
  }

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="font-bold text-2xl">Tracking</div>
        <div className="text-gray-500 text-base">
          Accuracy: {geolocationPosition.coords.accuracy}
        </div>
        <div className="text-gray-500 text-base">
          Altitude: {geolocationPosition.coords.altitude}
        </div>
        <div className="text-gray-500 text-base">
          Altitude Accuracy: {geolocationPosition.coords.altitudeAccuracy}
        </div>
        <div className="text-gray-500 text-base">
          Speed: {geolocationPosition.coords.speed}
        </div>
      </div>

      <button className="bg-primary font-medium mt-4 p-2 rounded-lg text-base text-white w-full">
        Submit
      </button>
    </div>
  );
}
