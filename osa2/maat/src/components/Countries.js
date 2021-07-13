import React from 'react'
import Country from './Country'

const Name = ({ country, showCountry }) => {
    return (
        <div>
        {country.name} <button onClick={showCountry} value={country.name}>show</button>
        </div>
    )
}

const Countries = ({ countries, filter, showCountry }) => {
    const filtered = []
    countries.forEach(element => {
        if (element.name.toLowerCase().includes(filter.toLowerCase())) filtered.push(element)
    });
    console.log("filtered length", filtered.length)
    if (filtered.length > 10) return <p>Too many matches, specify another filter</p>
    else if (filtered.length > 1 && filtered.length <= 10) return ( filtered.map((country) => <Name key={country.name} country={country} showCountry={showCountry}/>) )    
    else if (filtered.length === 0) return <p>no matches</p>
    else return <Country country={filtered[0]} />
    
}

export default Countries