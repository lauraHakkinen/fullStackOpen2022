import { useEffect, useState } from "react";
import axios from 'axios'

import Filter from './components/Filter'
import SearchResults from './components/SearchResults'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <Filter filter={filter} handleFilter={(event) => setFilter(event.target.value)} />
      <SearchResults countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default App;
