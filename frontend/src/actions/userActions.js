import axios from 'axios';
import {
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_REGISTER_FAIL,
   GET_ALL_USERS_REQUEST,
   GET_ALL_USERS_SUCCESS,
   GET_ALL_USERS_FAIL,
} from '../constants/userConstants';
import { returnErrors } from './errorActions';

export const loginUser = (user) => async (dispatch) => {
   try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
         headers: {
            'Content-type': 'application/json',
         },
      };
      const { data } = await axios.post('/api/auth', user, config);

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
   } catch (err) {
      dispatch(returnErrors(err.response.data.msg));
      dispatch({ type: USER_LOGIN_FAIL });
   }
};

export const registerUser = (user) => async (dispatch) => {
   try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
         headers: {
            'Content-type': 'application/json',
         },
      };
      const { data } = await axios.post('/api/users', user, config);

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
   } catch (err) {
      dispatch(returnErrors(err.response.data.msg));
      dispatch({ type: USER_REGISTER_FAIL });
   }
};

// Get all users except current users
export const getAllUsers = (keyword) => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_ALL_USERS_REQUEST });

      const { data } = await axios.get(
         `/api/users?search=${keyword}`,
         tokenConfig(getState)
      );

      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
   } catch (err) {
      dispatch(returnErrors(err.response.data.msg));
      dispatch({ type: GET_ALL_USERS_FAIL });
   }
};

export const tokenConfig = (getState) => {
   const token = getState().userLogin.token;

   const config = {
      headers: {
         'Content-type': 'application/json',
      },
   };

   if (token) {
      config.headers['x-auth-token'] = token;
   }

   return config;
};
