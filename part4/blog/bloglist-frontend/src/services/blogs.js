import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data;
}

const createBlog = async (newBlog) => {
  
  const config = {
    headers: { authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
};

const updateBlog = async (id, blogObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, blogObj);
  return res.data;
};

export default {
  getAll,
  setToken,
  createBlog,
  updateBlog
};