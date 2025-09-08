import axios from 'axios';

const api = axios.create({
  baseURL: (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE_URL) || 'http://localhost:5000/api',
});

export const getProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

export const getProjectById = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};

export const createProject = async (payload) => {
  const { data } = await api.post('/projects', payload);
  return data;
};



