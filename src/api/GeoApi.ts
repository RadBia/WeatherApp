import { geoApi } from "../hooks/useAxios";
import { City } from "../models/City";
import { GeoApiResponse } from "../models/GeoApiResponse";

export class GeoApi {
  static getCities = async (searchTerm: string) =>
    await geoApi.get<GeoApiResponse<City>>("/cities", {
      params: { minPopulation: 10000, namePrefix: searchTerm },
    });
}
