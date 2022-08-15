export function AllowLocation() {
  return (
    <div>
      <div style={{ height: "calc(50vh - 4rem)" }}>
        <iframe
          loading="lazy"
          allowFullScreen
          // referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/view?zoom=17&center=-33.9276,18.4142&key=AIzaSyA6WNw8PYvsig9g-I0j6_tEuegSiPUZfuE"
          style={{ border: "0", height: "100%", width: "100%" }}
          title="Maps"
        ></iframe>
      </div>
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
          <button className="bg-black-olive p-2.5 rounded-full text-2xl text-white w-full">
            Allow Location
          </button>
        </div>
      </div>
    </div>
  );
}
