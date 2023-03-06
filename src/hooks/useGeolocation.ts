import { useEffect, useState } from "react";

interface IGeoLocation {
  loaded: boolean;
  coordinates: {
    lat: string;
    lng: string;
  };
}

interface IErrorPosition {
  code: number;
  message: string;
}

const useGeoLocation = () => {
  const [geoLocation, setGeoLocation] = useState<IGeoLocation>({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const successMsg = (location: string | any) => {
    setGeoLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const errorMsg = (error: IErrorPosition) => {
    // setGeoLocation({
    //   loaded: true,
    //   error,
    // });
    console.warn(`ERROR(${error.code}): ${error.message}`);
  };

  const options = {
    enableHighAccuracy: true,
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      errorMsg({
        code: 0,
        message: "Geolocation not enabled or supported",
      });
    }
    navigator.geolocation.getCurrentPosition(successMsg, errorMsg, options);
    // eslint-disable-next-line
  }, []);
  return geoLocation;
};

export default useGeoLocation;
