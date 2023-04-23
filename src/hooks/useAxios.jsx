import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  const axiosPublic = axios.create({
    baseURL: process.env.REACT_APP_MAIN_URL,
  });

  const axiosWithToken = axios.create({
    baseURL: process.env.REACT_APP_MAIN_URL,
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosWithToken, axiosPublic };
};

export default useAxios;
