import React, { use, useEffect, useState } from 'react';

const Weather = ({ lat, lon, capital }) => {

    const [weather, setWeather] = React.useState(null)


    useEffect(() => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(Response => Response.json())
        .then(data => setWeather(data.current_weather))
        .catch(error => console.error("Error fetching weather data:", error));
    }, [lat, lon]);

    if (!weather) {
        return <div className="loading-message">Loading weather data...</div>;
    }
    return (
        <div className="weather-container">
            <h3 className="weather-title">Weather in {capital}</h3>
            <p><strong>Temperature:</strong> {weather.temperature}°C</p>
            <p><strong>Wind Speed:</strong> {weather.windspeed} km/h</p>
            <p><strong>Wind Direction:</strong> {weather.winddirection}°</p>
        </div> 
    );
}   

export default Weather
