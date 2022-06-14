import Country from './Country'

const Countries = ({countries}) => (
    <div>
        {countries.map(country =>
            <Country key={country.name.common} country={country} showData={false}/>
        )}
    </div>
)

export default Countries