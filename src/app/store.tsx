import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../services/weatherApi";
import weatherSlice from "../services/weatherSlice";
import { newsApi } from "../services/newsApi";

const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    weatherState: weatherSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(weatherApi.middleware)
      .concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
