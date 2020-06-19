import React from 'react'

const Result = ({countries, handleClick}) =>  {
  if (countries.length === 250 || countries.length === 1) {
    return null
  }
  else if (countries.length >= 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  return (
  <div>
    {countries.map(country =>
      <p key={country.name}>{country.name} <button onClick={() => handleClick(country)}>show</button></p> )}
  </div>
  )  
}

export default Result