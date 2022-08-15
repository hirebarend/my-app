export function AllowLocation() {
  return (
    <div>
      <div
        className="bg-slate-50 background-image-map"
        style={{ height: "calc(50vh - 4rem)" }}
      ></div>
      <div
        className="flex flex-col justify-between p-5"
        style={{ height: "calc(50vh - 4rem)" }}
      >
        <div>
          <div className="grid justify-items-center mb-8">
            <img
              alt="Location Icon"
              src="/images/location-icon.svg"
              style={{ height: "100px" }}
            />
          </div>
          <div className="font-medium text-center text-xl">
            We need your permission to access your location
          </div>
        </div>
        <div>
          <button className="bg-black p-2.5 rounded text-2xl text-white w-full">
            Allow location
          </button>
        </div>
      </div>
    </div>
  );
}
