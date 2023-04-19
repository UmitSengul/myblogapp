import axios from "axios"
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"

const useAuthCall = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const login = async (values) => {
    dispatch(fetchStart());
    console.log(values)
    try {
      const { data } = await axios.post(
        `http://32171.fullstack.clarusway.com/users/auth/login/`,
        values
      )
      dispatch(loginSuccess(data))
      toastSuccessNotify("Login performed")
      navigate("/")
      console.log(data)
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
      toastSuccessNotify("Login couldnt be performed")
    }
  }

  const logout = async () => {
    dispatch(fetchStart())
    try {
      await axios.post(`http://32171.fullstack.clarusway.com/users/auth/logout/`)
      dispatch(logoutSuccess())
      toastSuccessNotify("Logout performed")
      navigate("/")
    } catch (err) {
      dispatch(fetchFail())
      toastErrorNotify("Logout can not be performed")
    }
  }

  const register = async (values) => {
    dispatch(fetchStart())
    console.log(values)
    try {
      const { data } = await axios.post(
        `http://32171.fullstack.clarusway.com/users/register/`,
        values
      )
      dispatch(registerSuccess(data))
      toastSuccessNotify("Register performed")
      navigate("/")
    } catch (err) {
      dispatch(fetchFail())
      toastErrorNotify("Register can not be performed")
    }
  }

  return { login, register, logout }
}

export default useAuthCall