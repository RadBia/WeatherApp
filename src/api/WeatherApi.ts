import { weatherApi } from "../hooks/useAxios";
import { ForecastDto } from "../models/ForecastDto";

export class WeatherApi {
  static getFutureWeather = async (lat: number, lon: number) =>
    await weatherApi.get<ForecastDto>("/forecast", {
      params: { lat: lat, lon: lon },
    });
}
