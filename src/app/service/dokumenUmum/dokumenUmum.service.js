import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const getDokumenUmumService = async (token, search) => {
  const data = await axios.get(`${BASE_URL}getDokumenUmum`, {
    headers: {
      Authorization: `Bearer  ${token}`
    },
    params: {
      search: `${search}`
    }
  });
  return data;
};

export const getJenisDokumenUmumService = async (token) => {
  const data = await axios.get(`${BASE_URL}getDokumenUmumRef`, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};

export const getPokja = async (token) => {
  const data = await axios.get(`${BASE_URL}getPokjaReferensi`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const getJumlahDokumenUmumService = async (token) => {
  const data = await axios.get(`${BASE_URL}getjumlahdokumenumum`, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};

export const postDokumenUmumService = async (token, docData) => {
  const data = await axios.post(`${BASE_URL}postDokumenUmum`, docData, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};

export const deleteDokumenUmumService = async (token, id) => {
  const data = await axios.delete(`${BASE_URL}deleteDokumenUmum/${id}`, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};
