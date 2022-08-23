import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { Autocomplete } from "../components";
import { useEffect, useState } from "react";
import {
  calculateHaversineDistance,
  createDelayedPromise,
  humanizeDistance,
} from "../functions";
import { findAddresses, findViewModel } from "../api";

const createFindViewModelFn = () => {
  let abortController: AbortController | null = null;

  return async (address: string) => {
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();

    return await createDelayedPromise(
      () => findViewModel(address),
      500,
      abortController
    );
  };
};

const findViewModelFn = createFindViewModelFn();

const createFindAddressesFn = () => {
  let abortController: AbortController | null = null;

  return async (address: string) => {
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();

    return await createDelayedPromise(
      () => findAddresses(address),
      1000,
      abortController
    );
  };
};

const findAddressesFn = createFindAddressesFn();

export function Home() {
  const [viewModel, setViewModel] = useState(
    null as {
      address: string;
      coordinates: [number, number];
      items: Array<{
        address: string;
        coordinates: [number, number];
        inStock: boolean;
        name: string;
      }>;
    } | null
  );

  const [value, setValue] = useState("");

  const handleOnChangeAutocomplete = (value: string, isSelection: boolean) => {
    setValue(value);

    if (isSelection) {
      findViewModelFn(value)
        .then((x) => setViewModel(x))
        .catch(() => {});
    }
  };

  useEffect(() => {
    handleOnChangeAutocomplete(
      "37 Hely Hutchinson Avenue, Bakoven, Cape Town, South Africa",
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5">
      <div className="font-bold mb-4 text-4xl">Gas Find</div>

      <Autocomplete
        loadAsync={findAddressesFn}
        onChange={handleOnChangeAutocomplete}
        value={value}
      />

      {viewModel ? (
        <div className="font-medium mt-4 text-base">
          Found {viewModel.items.length} filling stations within 10km of{" "}
          {viewModel.address}
        </div>
      ) : null}

      <button className="bg-malachite font-medium mt-4 p-2 rounded-lg text-base text-white w-full">
        Order Gas Cylinder
      </button>

      <div className="mt-4">
        {viewModel?.items.map((x, index) => (
          <div className="grid grid-cols-12 my-4" key={`index2-${index}`}>
            <div
              className="bg-gray-200 col-span-3 rounded-lg"
              style={{ height: "75px" }}
            ></div>
            <div className="col-span-9 flex flex-col justify-between pl-2">
              <div className="font-medium text-lg">{x.name}</div>

              <div className="flex justify-between text-sm text-gray-500">
                <div>
                  <FontAwesomeIcon
                    className={
                      x.inStock ? "text-malachite" : "text-rosso-corsa"
                    }
                    icon={x.inStock ? faCircleCheck : faCircleXmark}
                  />
                  &nbsp;{x.inStock ? "In Stock" : "Out of Stock"}
                </div>
                <div>
                  <FontAwesomeIcon icon={faLocationPin} />
                  &nbsp;
                  {viewModel
                    ? `${humanizeDistance(
                        calculateHaversineDistance(
                          viewModel.coordinates,
                          x.coordinates
                        )
                      )}`
                    : "Unknown"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
