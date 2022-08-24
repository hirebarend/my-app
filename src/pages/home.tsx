import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { calculateHaversineDistance, humanizeDistance } from "../functions";
import { DATA } from "../api";
import { useGeolocation } from "../hooks";

export function Home() {
  const { geolocationPosition } = useGeolocation();

  const [items, setItems] = useState(
    null as Array<{
      address: string;
      coordinates: [number, number];
      inStock: boolean;
      name: string;
    }> | null
  );

  useEffect(() => {
    if (geolocationPosition) {
      setItems(
        DATA.sort((a, b) => {
          return (
            calculateHaversineDistance(
              [
                geolocationPosition.coords.latitude,
                geolocationPosition.coords.longitude,
              ],
              a.coordinates
            ) -
            calculateHaversineDistance(
              [
                geolocationPosition.coords.latitude,
                geolocationPosition.coords.longitude,
              ],
              b.coordinates
            )
          );
        })
      );
    } else {
      setItems(DATA);
    }
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
          <div className="my-4" key={`index-${index}`}>
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
                        x.coordinates
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
