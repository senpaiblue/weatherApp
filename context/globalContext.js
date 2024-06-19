"use Client";
import defaultStates from "@/app/utils/defaultStates";
import { kelvinToCelsius, kelvinToFahrenheit } from "@/app/utils/misc";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();
import { debounce } from "lodash";

export const GlobalContextProvider = ({ children }) => {
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [forecast, setForecast] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [fiveDayForecast, setFiveDayForecast]=useState({});
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([
    23.795399, 86.427040,
  ]);

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };
 //five day forecast
 const fetchFiveDayForecast = async (lat, lon) => {
  try {
    const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

    setFiveDayForecast(res.data);
  } catch (error) {
    console.log("Error fetching five day forecast data: ", error.message);
  }
};

 //geocoded list
 const fetchGeoCodedList = async (search) => {
  try {
    const res = await axios.get(`/api/geocoded?search=${search}`);

    setGeoCodedList(res.data);
  } catch (error) {
    console.log("Error fetching geocoded list: ", error.message);
  }
};

 // handle input
 const handleInput = (e) => {
  setInputValue(e.target.value);

  if (e.target.value === "") {
    setGeoCodedList(defaultStates);
  }
};
// debounce function
useEffect(() => {
  const debouncedFetch = debounce((search) => {
    fetchGeoCodedList(search);
  }, 500);

  if (inputValue) {
    debouncedFetch(inputValue);
  }

  // cleanup
  return () => debouncedFetch.cancel();
}, [inputValue]);


useEffect(() => {
  fetchForecast(activeCityCoords[0], activeCityCoords[1]);
  fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
}, [activeCityCoords]);

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
        getTemperature,
        fiveDayForecast,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,

      }}
    >
      <GlobalContextUpdate.Provider value={{
        setActiveCityCoords}}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
