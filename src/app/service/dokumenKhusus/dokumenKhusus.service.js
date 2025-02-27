import axios from "axios";

export const dokumenKhususService = async () => {
  const data = await axios.get("http://192.168.10.167:8089/library/getDokumenKhusus");
  return data;
};
