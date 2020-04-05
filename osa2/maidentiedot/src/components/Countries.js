import React from 'react'
import Button from './Button'
import Weather from './Weather'

const Countries = ({ countriesToShow, setNewFilter }) => {
    if (countriesToShow.length > 10) {
        return (
            <div>
                <br />
          Too many matches, spesify your filter!
            </div>
        )
    } else if (countriesToShow.length === 1) {
        const countryToShow = countriesToShow[0]
        const countryLanguages = countryToShow.languages
        const flag = countryToShow.flag

        return (
            <div>
                <h1>{countryToShow.name}</h1>
                <p>Capital: {countryToShow.capital}</p>
                <p>Population: {countryToShow.population}</p>
                <h2>Languages</h2>
                <ul>
                    {countryLanguages.map((language, name) =>
                        <li key={name}>
                            {language.name}
                        </li>)}
                </ul>
                <div>
                    <img src={flag} alt="" style={{ width: 100 }} />
                </div>
                <h2>Current Weather in {countryToShow.capital}</h2>
                <Weather place={countryToShow.name} />
            </div>
        )
    } else {
        return (
            <div>
                {countriesToShow.map((country, name) =>
                    <p key={name} >
                        {country.name}
                        <Button country={country} setNewFilter={setNewFilter} />
                    </p>
                )}
            </div>
        )
    }
}

export default Countries