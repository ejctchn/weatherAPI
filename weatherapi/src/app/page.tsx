"use client";
import { useState, useEffect } from 'react'


function getDate()
{

}

export default function Home() 
{
  const date = getDate();
   const [weatherData, setWeatherData] = useState(null);
   const [city, setCity] = useState("Rexburg");

  async function fetchData(cityName: string)
  {
    try
    {
      const response = await fetch("http://localhost:3000/api/weather?address=" + cityName);
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  useEffect(() =>
  {
    fetchData("Rexburg");
  }, [])

  return(
    <div>
      <h1>Weather app</h1>
    </div>
  );
}
