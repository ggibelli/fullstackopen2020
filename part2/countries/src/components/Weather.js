import React from 'react'

const Weather = ({ weather }) => {
  if (!weather.current) {
    return (
      <>
      </>
    )
  }
  return (
    <div>
      <h1>Weather in {weather.location.name}</h1>
      <strong>temperature </strong><span>{weather.current.temperature} Celcius</span>
      <br></br>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_description}></img>
      <br></br>
      <strong>wind: </strong><span>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</span>
    </div>
  )
}

export default Weather