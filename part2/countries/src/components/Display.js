import React from 'react'

const Display = ({countries}) => {
  if (countries.length !== 1) {
    return (
      <>
      </>
    )
  }
  const country = countries[0]
  return (
  <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <br></br>
    <h3>Languages</h3>
    <ul>
    {country.languages.map(language =>
      <li key={language.name}>{language.name}</li>
    )}
    </ul>
    <img src={country.flag} alt="{country.name} flag" height="128"></img>
  </div>
  ) 
}

export default Display