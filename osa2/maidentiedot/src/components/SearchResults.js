import Country from './Country'
import Countries from './Countries'


const SearchResults = ({ countries, filter, setFilter }) => {
    
	const filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
	const len = filtered.length

	switch (true) {

		case len > 10:
			return <p> Too many matches, specify another filter </p>

		case len === 1:
			return <Country country={filtered[0]} showData={true} setFilter={setFilter} />

		case len === 0:
			return <p>Could not find any match</p>

		default:
			return <Countries countries={filtered} setFilter={setFilter} /> 

	}
    
}

  export default SearchResults