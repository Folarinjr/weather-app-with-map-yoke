import React, { useEffect } from "react";
import MapBox from "../components/MapBox";
import News from "../components/News";
import { Box, Stack } from "@mui/material";
import useGeoLocation from "../hooks/useGeolocation";
import { setLocation } from "../services/weatherSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetForecastWeatherQuery } from "../services/weatherApi";
import { useGetWeatherNewsQuery } from "../services/newsApi";
import Loader from "../components/Loader";
import type { RootState } from "../app/store";

const Map = () => {
  const getGeoLocation = useGeoLocation();
  const isLoadingLocation = getGeoLocation.loaded;

  const locationState = useSelector<RootState, string>(
    (state) => state.weatherState.location
  );
  const dispatch = useDispatch();
  const { data, isFetching } = useGetForecastWeatherQuery(locationState);
  const location = data?.location;
  const current = data?.current;

  useEffect(() => {
    let currentLocation;
    if (locationState) {
      currentLocation = locationState;
    } else if (getGeoLocation?.loaded)
      currentLocation = [
        getGeoLocation?.coordinates.lat,
        getGeoLocation?.coordinates.lng,
      ];

    dispatch(setLocation(currentLocation));
    // eslint-disable-next-line
  }, [getGeoLocation]);

  const { data: news } = useGetWeatherNewsQuery(location?.region);

  if (isFetching || !isLoadingLocation)
    return (
      <>
        {" "}
        <Loader />{" "}
      </>
    );

  return (
    <Box>
      <Stack spacing={2}>
        <MapBox location={location} current={current} />
        <News news={news} />
      </Stack>
    </Box>
  );
};

export default Map;
