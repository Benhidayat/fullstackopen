import axios from 'axios';
const baseUrl = ' https://studies.cs.helsinki.fi/restcountries/';

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/api/all`);
    return request.then(res => res.data);
};

export default {
    getAllCountries
};