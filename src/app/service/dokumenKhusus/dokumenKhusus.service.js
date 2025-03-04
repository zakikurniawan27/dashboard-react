import axios from "axios";

export const dokumenKhususService = async (token, search) => {
  const data = await axios.get("http://192.168.10.167:8089/library/getDokumenKhusus", {
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
  const data = await axios.get("http://192.168.10.167:8089/library/getDokumenKhususRef", {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};

export const postDokumenKhusus = async (dataDoc, token) => {
  const data = await axios.post("http://192.168.10.167:8089/library/postDokumenKhusus", dataDoc, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};
