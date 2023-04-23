import axios from "axios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";
const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values) => {
    dispatch(fetchStart());
    console.log(values);
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_MAIN_URL + `users/auth/login/`,
        values
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Logged in successfully");
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
      toastErrorNotify("Login couldnt be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios.post(process.env.REACT_APP_MAIN_URL + `users/auth/logout/`);
      dispatch(logoutSuccess());
      toastSuccessNotify("Logged out successfully");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  const register = async (values) => {
    dispatch(fetchStart());
    console.log(values);
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_MAIN_URL + `users/register/`,
        values
      );
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Register can not be performed");
    }
  };

  return { login, register, logout };
};

export default useAuthCall;
