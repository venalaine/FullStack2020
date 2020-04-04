import React from 'react'

const Countries = ({ countriesToShow }) => {
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
            </div>
        )
    } else {
        return (
            <div>
                {countriesToShow.map((country, name) =>
                    <p key={name} > {country.name} </p>
                )}
            </div>
        )
    }
}

export default Countries