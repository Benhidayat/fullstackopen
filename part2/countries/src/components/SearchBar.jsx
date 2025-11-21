import React from 'react'

const SearchBar = ({ search, handleSearch }) => {
    return (
        <div>
            Find Counties
            <input type="text" value={search} onChange={handleSearch} />
        </div>
    )
};

export default SearchBar;
