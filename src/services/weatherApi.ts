import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `https://weatherapi-com.p.rapidapi.com/`;
const weatherHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_WEATHER_API_KEY,
  //   "X-RapidAPI-Key": "9f4c576137mshd157a6b0231e6c8p1fe999jsnaac72a3c03d0",
  "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
};

const requestWeather = (url: string) => ({ url, headers: weatherHeaders });

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getForecastWeather: builder.query({
      query: (location: string | []) =>
        requestWeather(`forecast.json?q=${location}&days=3`),
    }),
    getSearchWeather: builder.query({
      query: (search: string) => requestWeather(`search.json?q=${search}`),
    }),
  }),
});

export const { useGetForecastWeatherQuery, useGetSearchWeatherQuery } =
  weatherApi;
