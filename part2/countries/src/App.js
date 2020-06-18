import React, { useState, useEffect } from 'react'
import Input from './components/Input'
import Result from './components/Result'
import Display from './components/Display'

import axios from 'axios'
import Weather from './components/Weather'

function App() {

  const [ countries, setCountries] = useState([])
  const [ newFilter, setFilter ] = useState('')
  const [ town, setTown] = useState([])
  const [ weather, setWeather] = useState([])

  const access_key = process.env.REACT_APP_API_KEY

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleClick = (country) => {
    setFilter(country.name)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  if (filteredCountries.length === 1 && town !== filteredCountries[0]) {
    setTown(filteredCountries[0])
  }

  const hookMeteo = () => {
    console.log('chiamata api')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${town.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }
  
  useEffect(hookMeteo, [town])

  useEffect(hook, [])

  return (
    <div >
      <Input filter={newFilter} handleFilter={handleFilter} />
      <Result countries={filteredCountries} handleClick={handleClick} />
      <Display countries={filteredCountries}  />
      <Weather weather={weather} />
    </div>
  );
}

export default App;
