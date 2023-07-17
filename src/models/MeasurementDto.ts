import { CloudsDto } from "./CloudsDto";
import { MainDto } from "./MainDto";
import { WeatherDto } from "./WeatherDto";
import { WindDto } from "./WindDto";

export interface MeasurementDto {
    dt: number;
    dt_txt: string;
    clouds: CloudsDto;
    main: MainDto;
    weather: WeatherDto[];
    wind: WindDto;
}