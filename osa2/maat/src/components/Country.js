import React from 'react'

const Name = ({ country }) => {
    return <p>{country.name}</p>
}

const Languages = ({ languages }) => {
    return (
      <ul>
          {languages.map((lang) => {
              return <li key={lang.iso639_2}>{lang.name}</li>
          })}
      </ul>)
}

const Country = ({ country }) => {
    console.log("country:", country)
    return (
        <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <Languages languages={country.languages} />
        <img src={country.flag} width="200"></img>
        </div>
    )
}

export default Country