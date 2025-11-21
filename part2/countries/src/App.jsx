import { useEffect, useState } from 'react'
import countriesService from './services/countries';
import SearchBar from './components/SearchBar';
import Display from './components/Display';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService.getAllCountries()
      .then(data => {
        setCountries(data);
      })
      .catch(err => {
        console.log(err.message);
      })
  },[]);

  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <SearchBar search={search} handleSearch={handleSearchChange} />
      <Display countries={filteredCountries} />
    </div>
  )
};

export default App;
