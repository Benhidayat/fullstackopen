import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const SingleCountry = ({ country, show }) => {
    const [weather, setWeather] = useState({});

    const city = country.name.common;
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        weatherService.getCityWeather(city, API_KEY)
            .then(res => {
                setWeather(res);
            })
    },[]);

    console.log('weather', weather.weather[0].icon)
    
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
            <div>
                <h2>Weather in {country.name.common}</h2>
                <p>Temperature {weather.main.temp} Celsius</p>
                <img src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <p>Wind {weather.wind.speed} m/s</p>
            </div>
        </div>
    )
};

export default SingleCountry;
