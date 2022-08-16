import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    address: "2A Rontree Ave, Bakoven, Cape Town, 8005",
    inStock: false,
    name: "Caltex",
  },
  {
    address: "110 Regent Rd, Sea Point, Cape Town, 8060",
    inStock: true,
    name: "BP",
  },
  {
    address: "Main Rd, Sea Point, Cape Town, 8005",
    inStock: true,
    name: "Shell",
  },
  {
    address: "345 Main Rd, Sea Point, Cape Town, 8005",
    inStock: true,
    name: "TotalEnergies",
  },
  {
    address: "134 Main Rd, Sea Point, Cape Town, 8005",
    inStock: false,
    name: "Engen",
  },
  {
    address: "114 Main Rd, Sea Point, Cape Town, 8005",
    inStock: true,
    name: "Caltex",
  },
  {
    address: "Beach Rd, Mouille Point, Cape Town, 8005",
    inStock: true,
    name: "Shell",
  },
];

const array = chunks(items, 2);

export function Home() {
  return (
    <div className="p-5">
      <div className="font-bold mb-4 text-4xl">Gas Find</div>
      <input
        className="appearance-none bg-slate-50 focus:outline-none px-4 py-2 rounded-full text-black w-full"
        placeholder="Enter your address"
      />

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
              <div className="text-sm text-gray-500" style={{ height: "75px" }}>
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
