import { MeasurementDto } from "./MeasurementDto";

export interface ForecastDto {
    cnt: number;
    list: MeasurementDto[];
}