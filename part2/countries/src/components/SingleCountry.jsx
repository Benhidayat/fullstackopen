import React from 'react'

const SingleCountry = ({ country, show }) => {
    const capital = country.capital ? country.capital[0] : '';

    return (
        <div className='country' style={{display: show ? 'block' : 'none'}}>
            <h1>{country.name.common}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {country.area}</p>
            <div>
                <h2>Language</h2>
                <ul>
                    {Object.values(country?.languages).map(value => <li>{value}</li>)}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.name.common} />
        </div>
    )
};

export default SingleCountry;
