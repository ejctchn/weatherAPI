"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import './globals.css';
import { getIronSession } from 'iron-session';
import RegPage from './register';

function getDate()
{
  const currentDate = new Date();
  const options = { month: "long" };
  const monthName = currentDate.toLocaleString("en-US", options);
  const date = new Date().getDate() + ", " + monthName;
  return date;
}

export default function Home() 
{
  const date = getDate();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState("");
  const [ recents, setRecents ] = useState<any>(null);




  async function fetchData(cityName: string)
  {
    try
    {
      const response = await fetch("http://localhost:3000/api/weather?address=" + cityName);
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
      setRecents(weatherData?.name);
      console.log(recents);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  async function fetchDataByCoord(latitude: number, longitude: number)
  {
    try
    {
      const response = await fetch(`http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`);
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
      setRecents(weatherData?.name);
      console.log(recents);
    }
    catch(error)
    {
      console.log(error);
    }

  }

  useEffect(() =>
  {
    if("geolocation" in navigator)
    {
      navigator.geolocation.getCurrentPosition((position) => 
      {
        const { latitude, longitude } = position.coords;
        fetchDataByCoord(latitude, longitude);
        // recents += (weatherData?.name);
      }, (error) => {console.log(error);}
      )
    }
   
    //fetchData("Rexburg");
  }, []);

  return(
    <main className={styles.main}>
      <section className={styles.account}>
        < RegPage />
      </section>
      <article className={styles.widget}>
        <form  onSubmit={(e) => {e.preventDefault(); fetchData(city);}} className={styles.weatherLocation}>
          <input className={styles.input_field} placeholder='Enter City Name' type='text' id='cityName' name='cityName' onChange={(e) => setCity(e.target.value)} />
          <button className={styles.search_button} type='submit'>Search</button>
        </form>
        {
          weatherData && weatherData.weather && weatherData.weather[0]? 
          (
            <>
              <div className={styles.icon_and_weatherInfo}>
                <div className={styles.weatherIcon}>
                  {
                    weatherData?.weather[0]?.description === "rain" || weatherData?.weather[0]?.description === "fog" ?
                    (
                      <i className={`wi wi-day-${weatherData?.weather[0]?.description}`}></i>
                    ) : (
                      <i className='wi wi-day-cloudy'></i>
                    )
                  }
                </div>

                <div className={styles.weatherInfo}>
                  <div className={styles.temperature}>
                    <span>{((weatherData?.main?.temp)).toFixed(0) + String.fromCharCode(176)}</span>
                  </div>
                  <div className={styles.weatherCondition}>{weatherData?.weather[0]?.description?.toUpperCase()}</div>
                </div>
                </div>
                <div className={styles.place}>{weatherData?.name}</div>
                <div className={styles.date}>{date}</div>
              
              
            </>
          ):
          (
            <div className={styles.place}>Loading...</div>
          )
        }
      </article>
    </main>
  );
}
