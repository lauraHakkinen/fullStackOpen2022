import Country from './Country'

const Countries = ({countries, setFilter}) => (
	<div>
		{countries.map(country =>
			<Country key={country.name.common} 
					country={country} 
					showData={false} 
					setFilter={setFilter} 
			/>
		)}
	</div>
)

export default Countries