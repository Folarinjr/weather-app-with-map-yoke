import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `https://bing-news-search1.p.rapidapi.com/news/`;

const newsHeaders = {
  "X-RapidAPI-Key": "9f4c576137mshd157a6b0231e6c8p1fe999jsnaac72a3c03d0",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const requestNews = (url: string) => ({ url, headers: newsHeaders });

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getWeatherNews: builder.query({
      query: (location) =>
        requestNews(
          `search?q=${location}%20Weather&freshness=Day&textFormat=Raw&safeSearch=Off`
        ),
    }),
  }),
});

export const { useGetWeatherNewsQuery } = newsApi;
