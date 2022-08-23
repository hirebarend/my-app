import { useEffect, useState } from "react";

export function useGeolocation() {
  const [error, setError] = useState(null as Error | null);

  const [state, setState] = useState(null as GeolocationPosition | null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (geolocationPosition: GeolocationPosition) => {
          setState(geolocationPosition);
        },
        (geolocationPositionError: GeolocationPositionError) => {
          setError(new Error(geolocationPositionError.message));
        },
        {
          enableHighAccuracy: true,
        }
      );

      const id = navigator.geolocation.watchPosition(
        (geolocationPosition: GeolocationPosition) => {
          setState(geolocationPosition);
        },
        (geolocationPositionError: GeolocationPositionError) => {
          setError(new Error(geolocationPositionError.message));
        },
        {
          enableHighAccuracy: true,
        }
      );

      return () => navigator.geolocation.clearWatch(id);
    }
  }, []);

  return { error, geolocationPosition: state };
}
