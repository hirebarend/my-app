import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createReport, findItem } from "../api";
import { calculateHaversineDistance, humanizeDistance } from "../functions";
import { useDeviceId, useGeolocation } from "../hooks";
import { Report } from "../types";

export function Item() {
  const deviceId = useDeviceId();

  const { geolocationPosition } = useGeolocation();

  const useMutationResult = useMutation([], async (report: Report) => {
    await createReport(report);
  });

  const navigate = useNavigate();

  const params = useParams();

  const [item, setItem] = useState(
    null as {
      address: string;
      coordinates: [number, number];
      inStock: boolean;
      isStockist: boolean;
      reference: string;
      name: string;
    } | null
  );

  useEffect(() => {
    if (!params.reference) {
      return;
    }

    findItem(params.reference).then((item) => setItem(item));
  }, [params]);

  if (!geolocationPosition || !item) {
    return <></>;
  }

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="font-bold text-2xl">{item.name} Filling Station</div>
        <div className="text-gray-500 text-base">{item.address}</div>
      </div>

      <img
        alt="Filling Station"
        className="mt-4 rounded-lg shadow"
        src="/images/lily-banse-A0vexBVer0I-unsplash.jpg"
      />

      <div className="bg-gray-50 flex justify-between mt-4 p-4 rounded text-base">
        <div>
          <FontAwesomeIcon
            className={item.inStock ? "text-primary" : "text-secondary"}
            icon={item.inStock ? faCircleCheck : faCircleXmark}
          />
          &nbsp;
          <span className="font-medium">
            {item.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div>
          <FontAwesomeIcon className="text-primary" icon={faLocationPin} />
          &nbsp;
          <span className="font-medium">
            {geolocationPosition
              ? `${humanizeDistance(
                  calculateHaversineDistance(
                    [
                      geolocationPosition.coords.latitude,
                      geolocationPosition.coords.longitude,
                    ],
                    item.coordinates
                  )
                )}`
              : "Unknown"}
          </span>
        </div>
      </div>

      <div className="gap-2 grid grid-cols-2">
        <div>
          <button className="bg-white border border-secondary font-medium mt-4 p-2 rounded-lg text-base text-secondary w-full">
            Directions
          </button>
        </div>
        <div>
          <button className="bg-white border border-secondary font-medium mt-4 p-2 rounded-lg text-base text-secondary w-full">
            Call
          </button>
        </div>
      </div>

      <button
        className="bg-primary disabled:opacity-75 font-medium mt-4 p-2 rounded-lg text-base text-white w-full"
        disabled={useMutationResult.isLoading}
        onClick={() =>
          useMutationResult.mutate({
            coordinates: {
              latitude: geolocationPosition.coords.latitude,
              longitude: geolocationPosition.coords.longitude,
            },
            deviceId,
            isFraudulent:
              calculateHaversineDistance(
                [
                  geolocationPosition.coords.latitude,
                  geolocationPosition.coords.longitude,
                ],
                item.coordinates
              ) > 0.5,
            reference: item.reference,
            status: "Out of Stock",
            timestamp: new Date().getTime(),
          })
        }
      >
        Report Out of Stock
      </button>

      <button
        className="font-medium mt-4 p-2 text-base text-secondary w-full"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
