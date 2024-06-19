"use Client";
import { kelvinToCelsius, kelvinToFahrenheit } from "@/app/utils/misc";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);

  const fetchForecast = async () => {
    try {
      const res = await axios.get("/api/weather");
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const getTemperature = (temp) => {
    return isCelsius ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp);
  };

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        isCelsius,
        toggleTemperatureUnit,
        getTemperature
      }}
    >
      <GlobalContextUpdate.Provider>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
