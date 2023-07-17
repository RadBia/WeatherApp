import { ForecastView } from "../models/ForecastView";
import { MeasurementDto } from "../models/MeasurementDto";

export const mapForecastDtoToView = (
  dto: MeasurementDto
): ForecastView | null => {
  if (!dto) {
    return null;
  }

  return {
    description: dto.weather[0].description,
    feelsLike: Math.round(dto.main.feels_like),
    humidity: dto.main.humidity,
    pressure: dto.main.pressure,
    temp: Math.round(dto.main.temp),
    windSpeed: dto.wind.speed,
    cloudLevel: dto.clouds.all,
  };
};
