import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Autocomplete } from "../components";
import { useEffect, useState } from "react";
import { createDelayedPromise } from "../functions";

const coordinates = [-33.9088359, 18.4072053];

const items = [
  {
    address: "4 Somerset Rd, Green Point",
    coordinates: [-33.9144383, 18.4177846],
    inStock: true,
    name: "BP",
  },
  {
    address: "5 Somerset Rd, De Waterkant",
    coordinates: [-33.9165503, 18.4185717],
    inStock: false,
    name: "Caltex",
  },
  {
    address: "81 Church St, Cape Town City Centre",
    coordinates: [-33.9239185, 18.4199813],
    inStock: false,
    name: "Shell",
  },
  {
    address: "1 Orange Street, Cape Town City Centre",
    coordinates: [-33.9271299, 18.4137947],
    inStock: false,
    name: "Shell",
  },
  {
    address: "2A Rontree Ave, Bakoven",
    coordinates: [-33.96346, 18.37976],
    inStock: false,
    name: "Caltex",
  },
  {
    address: "110 Regent Rd, Sea Point",
    coordinates: [-33.92233, 18.3806],
    inStock: true,
    name: "BP",
  },
  {
    address: "166 Main Rd, Sea Point",
    coordinates: [-33.91625, 18.38917],
    inStock: false,
    name: "Shell",
  },
  {
    address: "345 Main Rd, Sea Point",
    coordinates: [-33.9146, 18.39111],
    inStock: true,
    name: "TotalEnergies",
  },
  {
    address: "134 Main Rd, Sea Point",
    coordinates: [-33.91356, 18.39141],
    inStock: false,
    name: "Engen",
  },
  {
    address: "114 Main Rd, Sea Point",
    coordinates: [-33.9120329, 18.392735],
    inStock: true,
    name: "Caltex",
  },
  {
    address: "179 Beach Rd, Mouille Point",
    coordinates: [-33.8994917, 18.4106603],
    inStock: true,
    name: "Shell",
  },
].sort((a, b) => {
  return (
    haversine(coordinates, a.coordinates) -
    haversine(coordinates, b.coordinates)
  );
});

const array = chunks(items, 2);

async function loadAsync(value: string): Promise<Array<string>> {
  const response = await axios.post<{
    predictions: Array<{ description: string }>;
  }>("https://startup-55-function-app.azurewebsites.net/api/v1/cors", {
    config: {
      params: {
        input: value,
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

async function getLocation(
  value: string
): Promise<{ address: string; coordinates: Array<number> }> {
  const response = await axios.post<{
    results: Array<{ geometry: { location: { lat: number; lng: number } } }>;
  }>("https://startup-55-function-app.azurewebsites.net/api/v1/cors", {
    config: {
      params: {
        address: value,
        key: "AIzaSyA6WNw8PYvsig9g-I0j6_tEuegSiPUZfuE",
      },
    },
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json",
  });

  return {
    address: value,
    coordinates: [
      response.data.results[0].geometry.location.lat,
      response.data.results[0].geometry.location.lng,
    ],
  };
}

export function Home() {
  const [location, setLocation] = useState(
    null as { address: string; coordinates: Array<number> } | null
  );

  const [locationAbortController, setLocationAbortController] = useState(
    null as AbortController | null
  );

  const [value, setValue] = useState("");

  const handleOnChangeAutocomplete = (value: string) => {
    if (locationAbortController) {
      locationAbortController.abort();
    }

    setValue(value);

    const abortController: AbortController = new AbortController();

    createDelayedPromise(() => getLocation(value), 1000, abortController)
      .then((location: { address: string; coordinates: Array<number> }) => {
        setLocation(location);

        setLocationAbortController(null);
      })
      .catch(() => {});

    setLocationAbortController(abortController);
  };

  useEffect(() => {
    handleOnChangeAutocomplete(
      "37 Hely Hutchinson Avenue, Bakoven, Cape Town, South Africa"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5">
      <div className="font-bold mb-4 text-4xl">Gas Find</div>

      <Autocomplete
        loadAsync={loadAsync}
        onChange={handleOnChangeAutocomplete}
        value={value}
      />

      {location ? (
        <div className="font-medium mt-4 text-base">
          Found {items.length} filling stations within 10km of{" "}
          {location.address}
        </div>
      ) : null}

      {array?.map((x, index1) => (
        <div className="gap-4 grid grid-cols-2 mt-4" key={`index1-${index1}`}>
          {x.map((y, index2) => (
            <div key={`index2-${index2}`}>
              {/* <img
                alt=""
                className="rounded-lg w-full"
                src="/images/image.jpg"
              /> */}
              <div
                className="bg-gray-200 rounded-lg"
                style={{ height: "90px" }}
              ></div>
              <div className="font-medium mt-2 text-lg">{y.name}</div>
              <div className="text-sm text-gray-500" style={{ height: "50px" }}>
                {y.address}
              </div>

              <div className="text-sm text-gray-500">
                <FontAwesomeIcon
                  className={y.inStock ? "text-malachite" : "text-rosso-corsa"}
                  icon={y.inStock ? faCircleCheck : faCircleXmark}
                />
                &nbsp;{y.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* <button className="bg-black-olive p-2.5 rounded-full text-2xl text-white w-full">
        Allow Location
      </button> */}
    </div>
  );
}

function chunks<T>(
  array: Array<T> | null,
  n: number | null
): Array<Array<T>> | null {
  if (!array) {
    return null;
  }

  if (!n) {
    return null;
  }

  return array.reduce((array, item, index) => {
    const chunkIndex: number = Math.floor(index / n);

    if (!array[chunkIndex]) {
      array[chunkIndex] = [];
    }

    array[chunkIndex].push(item);

    return array;
  }, [] as Array<Array<T>>);
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversine(
  coordinates1: Array<number>,
  coordinates2: Array<number>
): number {
  var R = 6371; // Radius of the earth in km
  var dLat = degreesToRadians(coordinates2[0] - coordinates1[0]); // deg2rad below
  var dLon = degreesToRadians(coordinates2[1] - coordinates1[1]);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(coordinates1[0])) *
      Math.cos(degreesToRadians(coordinates2[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
