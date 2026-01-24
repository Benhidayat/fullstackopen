import axios from "axios";
const BASEURL = '/api/login';

const login = async (credentials) => {
    const res = await axios.post(BASEURL, credentials);
    return res.data;
};

export default { login };