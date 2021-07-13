import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
        .get("https://restcountries.eu/rest/v2/all")
        .then((res) => {
          console.log(res.data);
          setCountries(res.data)
        })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (event) => {
    console.log(event);
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      debug: {filter}
      <Countries countries={countries} filter={filter} showCountry={showCountry} />
    </div>
  )
}

export default App;
