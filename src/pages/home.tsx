export function Home() {
  return (
    <div className="flex flex-col justify-between p-5">
      <input
        className="bg-slate-50 px-4 py-2 rounded-full text-black w-full"
        placeholder="Enter your address"
      />

      <div className="gap-4 grid grid-cols-2 mt-6">
        <div>
          <img alt="" className="rounded-lg w-full" src="/images/image.jpg" />
          <div className="font-medium mt-2 text-lg">Shell</div>
          <p className="text-sm text-gray-500">
            1 Orange Street, Cape Town City Centre, Cape Town
          </p>
        </div>
        <div>
          <img alt="" className="rounded-lg w-full" src="/images/image.jpg" />
          <div className="font-medium mt-2 text-lg">Shell</div>
          <p className="text-sm text-gray-500">
            1 Orange Street, Cape Town City Centre, Cape Town
          </p>
        </div>
      </div>

      {/* <button className="bg-black-olive p-2.5 rounded-full text-2xl text-white w-full">
        Allow Location
      </button> */}
    </div>
  );
}
