import React, { useState, useEffect } from 'react';
import Countries from './components/Countries'
import SearchForm from './components/SearchForm'
import axios from 'axios'

function App() {
  
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <SearchForm filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} setNewFilter={setNewFilter} />
    </div>
  );
}

export default App;