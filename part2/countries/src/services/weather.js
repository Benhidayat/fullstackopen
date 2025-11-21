import axios from "axios";
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric';

const getCityWeather = (city, api) => {
    const request = axios.get(`${baseUrl}&q=${city}&appid=${api}`);
    return request.then(res => res.data);
};

export default {
    getCityWeather
}