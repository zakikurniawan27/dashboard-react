import axios from "axios";

export const getDokumenUmumService = async (token, search) => {
  const data = await axios.get("http://192.168.10.167:8089/library/getDokumenUmum", {
    headers: {
      Authorization: `Bearer  ${token}`
    },
    params: {
      search: `${search}`
    }
  });
  return data;
};

export const postDokumenUmumService = async (token, docData) => {
  const data = await axios.post("http://192.168.10.167:8089/library/postDokumenUmum", docData, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};

export const deleteDokumenUmumService = async (token, id) => {
  const data = await axios.delete(`http://192.168.10.167:8089/library/deleteDokumenUmum/${id}`, {
    headers: {
      Authorization: `Bearer  ${token}`
    }
  });
  return data;
};
