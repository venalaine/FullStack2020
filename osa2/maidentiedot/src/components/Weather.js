import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ place }) => {

    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${place}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [])

    const weatherIcon = weather.weather_icons

    return (
        <div>
            <p><b>Temperature:</b> {weather.temperature} Celsius</p>
            <p><b>Wind speed:</b> {weather.wind_speed} mph</p>
            <p><b>Wind direction:</b> {weather.wind_dir} </p>
            <img src={weatherIcon} alt='Weather icon' />
        </div>
    )
}

export default Weather