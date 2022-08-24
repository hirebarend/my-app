import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateHaversineDistance, humanizeDistance } from "../functions";
import { DATA } from "../api";
import { useGeolocation } from "../hooks";

export function Item() {
  const { geolocationPosition } = useGeolocation();

  const navigate = useNavigate();

  const [item, setItem] = useState(
    null as {
      address: string;
      coordinates: [number, number];
      inStock: boolean;
      name: string;
    } | null
  );

  useEffect(() => {
    setItem(DATA[0]);
  }, []);

  if (!item) {
    return <></>;
  }

  return (
    <div className="p-5">
      <div className="mb-4">
        <div className="font-bold text-2xl">{item.name} Filling Station</div>
        <div className="text-gray-500">{item.address}</div>
      </div>

      <div className="bg-gray-50 flex justify-between mt-4 p-4 rounded">
        <div>
          <FontAwesomeIcon
            className={item.inStock ? "text-primary" : "text-gray-500"}
            icon={item.inStock ? faCircleCheck : faCircleXmark}
          />
          &nbsp;{item.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <div>
          <FontAwesomeIcon className="text-gray-500" icon={faLocationPin} />
          &nbsp;
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
        </div>
      </div>

      <button className="bg-primary font-medium mt-4 p-2 rounded-lg text-base text-white w-full">
        Order a Gas Cylinder
      </button>

      <button
        className="bg-white border border-primary font-medium mt-4 p-2 rounded-lg text-base text-primary w-full"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
