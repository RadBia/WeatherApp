import axios, { AxiosRequestConfig } from "axios";

export const geoApi = axios.create();
export const weatherApi = axios.create();

const useAxios = () => {
  geoApi.interceptors.request.use((config: AxiosRequestConfig) => {
    if (config?.headers) {
      config.headers["X-RapidAPI-Key"] = process.env.REACT_APP_GEO_API_AUTH_KEY;
      config.headers["X-RapidAPI-Host"] = process.env.REACT_APP_GEO_API_HOST;
    }

    return {
      ...config,
      baseURL: process.env.REACT_APP_GEO_API_URL,
    };
  });

  weatherApi.interceptors.request.use((config: AxiosRequestConfig) => {
    return {
      ...config,
      baseURL: process.env.REACT_APP_WEATHER_API_URL,
      params: {
        ...config.params,
        appid: process.env.REACT_APP_WEATHER_API_KEY,
        units: "metric"
      }
    };
  });
};

export default useAxios;
