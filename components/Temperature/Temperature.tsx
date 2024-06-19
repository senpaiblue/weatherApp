"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import moment from "moment";
import { TemperatureDropDown } from "../TemperatureDropDown/TemperatureDropDown";

function Temperature() {
  const { forecast, getTemperature } = useGlobalContext();

  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  const minTemp = getTemperature(main?.temp_min);
  const maxTemp = getTemperature(main?.temp_max);
  const currentTemp = getTemperature(main?.temp);

  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    // update time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // custom format: 24 hour format
      const formattedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <div className="flex flex-row gap-4 items-center">
          <TemperatureDropDown />
          <span className="font-medium">{localTime}</span>
        </div>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{currentTemp}°</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}°</span>
          <span>High: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
