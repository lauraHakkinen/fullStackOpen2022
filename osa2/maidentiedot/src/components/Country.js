const Country = ({ country, showData, setFilter }) => {

  switch (true) {

    case showData:
      return (
        <div>
          <h1>{country.name.common}</h1>
          <div>capital {country.capital}</div>
          <div>area {country.area}</div>
          <h3>languages:</h3>
          <ul>
            {Object.entries(country.languages).map(([key, value]) => <li key={key}> {value} </li>)}
          </ul>
          <img src={country.flags.png} alt="flag" />
          <h2>Weather in {country.name.common}</h2>
        </div>
      )

    default:
      return (
        <div>
          {country.name.common}
          <button onClick={() => setFilter(country.name.common)}>show</button>
        </div>
      )
  }

}

export default Country