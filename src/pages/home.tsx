import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Autocomplete } from "../components";
import { useEffect, useState } from "react";
import { createDelayedPromise } from "../functions";
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
      1000,
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

      {chunks(viewModel?.items || [], 2)?.map((x, index1) => (
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
