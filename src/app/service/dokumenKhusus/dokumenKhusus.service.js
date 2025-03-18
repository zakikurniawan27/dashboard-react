import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const dokumenKhususService = async (token, search) => {
  const data = await axios.get(`${BASE_URL}getDokumenKhusus`, {
    headers: {
      Authorization: `Bearer  ${token}`
    },
    params: {
      search: `${search}`
    }
  });
  return data;
};

export const getJenisDokumen = async (token) => {
  const data = await axios.get(`${BASE_URL}getDokumenKhususRef`, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};

export const getJumlahDokumenKhususService = async (token) => {
  const data = await axios.get(`${BASE_URL}getjumlahdokumenkhusus`, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};

export const postDokumenKhusus = async (dataDoc, token) => {
  const data = await axios.post(`${BASE_URL}postDokumenKhusus`, dataDoc, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};

export const deleteDokumenKhusus = async (token, id) => {
  const data = await axios.delete(`${BASE_URL}DeleteDokumenKhusus/${id}`, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};
