import React from "react"
import getAll from "./services/countries"
import Wheater from "./Weather"
import './App.css'


function App() {

  const [countries, setCountries] = React.useState([])
  const [newFilter, setNewFilter] = React.useState("")
  const [selectedCountry, setSelectedCountry] = React.useState(null)
  

  
  React.useEffect(() => {
    getAll().then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  React.useEffect(() => {
    setSelectedCountry(null)
  }, [newFilter])
  
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  )

  const handleShowCountry = (country) => {
    if(selectedCountry && selectedCountry.name.common === country.name.common) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
    }
  }
  
  const CountryDetails = ({country}) => {
    return (
      <div className="country-details">
        <h2 className="country-title">{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
        <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
        <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`} 
          className="country-flag"
        />
        {country.capitalInfo && country.capitalInfo.latlng && (
          <Wheater 
            lat={country.capitalInfo.latlng[0]}
            lon={country.capitalInfo.latlng[1]}
            capital={country.capital}
          />
        )}
      </div>
    )
  }

  const countryToShow = selectedCountry ? selectedCountry : (filteredCountries.length === 1 ? filteredCountries[0] : null)





return (
  <div className="app-container">
    <h1 className="app-title">Country Weather</h1>
    <form className="search-form">
      <label className="search-label">
        Find countries
        <input 
          type="text" 
          value={newFilter}
          onChange={event => setNewFilter(event.target.value)} 
          className="search-input"
          placeholder="Type a country name..."
        />
      </label>
    </form>

    <div className="results-container">
      {newFilter && (
        filteredCountries.length > 10 ? (
          <p className="too-many-matches">Too many matches, specify another filter</p>
        ) : (
          <>
            {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
              <>
                {filteredCountries.map(country => 
                  <div key={country.name.common} className="country-list-item">
                    <span className="country-name">{country.name.common}</span>
                    <button 
                      onClick={() => handleShowCountry(country)}
                      className="show-button"
                    >
                      {selectedCountry && selectedCountry.name.common === country.name.common ? "Hide" : "Show"}
                    </button>
                  </div>
                )}
              </>
            )}

            {filteredCountries.length === 1 && (
              <CountryDetails country={filteredCountries[0]} />
            )}

            {selectedCountry && <CountryDetails country={selectedCountry} />}
          </>
        )
      )}
    </div>
  </div>
)
}


export default App
