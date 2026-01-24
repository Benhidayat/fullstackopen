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

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.post(baseUrl, newObj, config);
  return res.data;
};

const updateBlog = async (id, blogObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, blogObj);
  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  getAll,
  create,
  setToken,
  updateBlog,
  deleteBlog
};