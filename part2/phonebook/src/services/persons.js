import axios from "axios";
const baseUrl = '/api/persons';

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

const updatePerson = (id, personObj) => {
    const request = axios.put(`${baseUrl}/${id}`, personObj);
    return request.then(res => res.data);
};

export default {
    getAllPersons,
    createNewPerson,
    deletePerson,
    updatePerson
}