import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateHaversineDistance, humanizeDistance } from "../functions";
import { findItems } from "../api";
import { useGeolocation } from "../hooks";
import { Item } from "../types";

export function HomePage() {
  const { geolocationPosition } = useGeolocation();

  const navigate = useNavigate();

  const [items, setItems] = useState(null as Array<Item> | null);

  useEffect(() => {
    findItems(
      geolocationPosition
        ? {
            latitude: geolocationPosition.coords.latitude,
            longitude: geolocationPosition.coords.longitude,
          }
        : null
    ).then((x) => setItems(x));
  }, [geolocationPosition]);

  return (
    <div className="p-5">
      <div className="font-bold mb-4 text-4xl text-center">
        <div className="flex justify-center">
          <img alt="Gas Find Icon" src="/images/icon.png" width={64} />
        </div>
        <div>Gas Find</div>
      </div>

      <button className="bg-primary font-medium mt-4 p-2 rounded-lg text-base text-white w-full">
        Order a Gas Cylinder
      </button>

      <div className="mt-4">
        {items?.map((x, index) => (
          <div
            className="my-4"
            key={`index-${index}`}
            onClick={() => navigate(`/${x.reference}`)}
          >
            <div className="font-medium text-lg">{x.name}</div>
            <div className="text-sm text-gray-500">{x.address}</div>

            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <div>
                <FontAwesomeIcon
                  className={x.inStock ? "text-primary" : "text-gray-500"}
                  icon={x.inStock ? faCircleCheck : faCircleXmark}
                />
                &nbsp;{x.inStock ? "In Stock" : "Out of Stock"}
              </div>
              <div>
                <FontAwesomeIcon
                  className="text-gray-500"
                  icon={faLocationPin}
                />
                &nbsp;
                {geolocationPosition
                  ? `${humanizeDistance(
                      calculateHaversineDistance(
                        [
                          geolocationPosition.coords.latitude,
                          geolocationPosition.coords.longitude,
                        ],
                        [x.coordinates.latitude, x.coordinates.longitude]
                      )
                    )}`
                  : "Unknown"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
