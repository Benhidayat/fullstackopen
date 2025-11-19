import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
};

const createNewPerson = (personObj) => {
    const request = axios.post(baseUrl, personObj)
    return request.then(res => res.data);
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(res => res.data);
};

export default {
    getAllPersons,
    createNewPerson,
    deletePerson
}