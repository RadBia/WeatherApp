import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WeatherApi } from "../api/WeatherApi";
import { City } from "../models/City";
import { ForecastDto } from "../models/ForecastDto";
import { differenceInCalendarDays, addDays, format, isSameDay } from "date-fns";
import { mapForecastDtoToView } from "../helpers/ForecastMapper";

interface FutureWeatherProps {
  selectedCity: City | null;
}

export const FutureWeather = (props: FutureWeatherProps) => {
  const [forecast, setForecast] = useState<ForecastDto | null>(null);

  const fetchFutureWeather = useCallback(async (selectedCity: City) => {
    const result = await WeatherApi.getFutureWeather(
      selectedCity.latitude,
      selectedCity.longitude
    );

    setForecast(result.data);
  }, []);

  const days = useMemo(() => {
    if (!forecast) {
      return [];
    }

    const endDate = new Date(forecast.list[forecast.cnt - 1].dt * 1000);
    const startDate = new Date(forecast.list[0].dt * 1000);

    const daysAmount = differenceInCalendarDays(endDate, startDate) + 1;

    const days = [];

    for (let i = 0; i < daysAmount; i++) {
      const date = addDays(startDate, i);

      days.push({
        name: format(date, "EEEE"),
        data: forecast.list.filter((x) =>
          isSameDay(new Date(x.dt * 1000), date)
        ),
      });
    }

    return days;
  }, [forecast]);

  useEffect(() => {
    if (props.selectedCity) {
      fetchFutureWeather(props.selectedCity);
    }
  }, [props.selectedCity, fetchFutureWeather]);

  return (
    <div>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {days.map((day) => (
            <Tab>{day.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {days.map((day) => (
            <TabPanel>
              {day.data.length > 0 ? (
                <Accordion allowToggle>
                  {day.data.map((measurement) => {
                    const view = mapForecastDtoToView(measurement);
                    return (
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              {measurement.dt_txt}
                            </Box>
                            <Box as="span" flex="1" textAlign="right">
                              <Text>Temperature: {view?.temp}°C</Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          display="flex"
                          flexDirection="row"
                        >
                          <Box as="span" flex="1" textAlign="left">
                            <Text>Pressure: {view?.pressure} hPa</Text>
                            <Text>Clouds level: {view?.cloudLevel}%</Text>
                            <Text>Sea level: {view?.pressure}m</Text>
                          </Box>
                          <Box as="span" flex="1" textAlign="right">
                            <Text>Humidity: {view?.humidity}%</Text>
                            <Text>Wind speed: {view?.windSpeed} m/s</Text>
                            <Text>Feels like: {view?.feelsLike}°C</Text>
                            <Text>Description: {view?.description}</Text>
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                <Box textAlign="center">No forecast for this day</Box>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};
