import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginServices = async (username, password) => {
  const data = await axios.post(`${BASE_URL}login`, {
    username,
    password
  });
  return data;
};

export const getMeServices = async (token) => {
  const data = await axios.get(`${BASE_URL}getpegawai`, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};
