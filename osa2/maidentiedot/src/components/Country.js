const Country = ({country, showData}) => {

    switch (true) {
        case showData:
            return (
                <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <h4>languages:</h4>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) => <li key={key}> {value} </li> )}
                </ul>
                <img src={country.flags.png} alt="flag" />
                </div>
            )

        default:
            return <div> {country.name.common} </div>
    }
     
}

export default Country