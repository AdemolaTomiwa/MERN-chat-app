import {
   GET_ALL_USERS_FAIL,
   GET_ALL_USERS_REQUEST,
   GET_ALL_USERS_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const loginUserReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_LOGIN_REQUEST:
         return { loading: true };
      case USER_LOGIN_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            token: action.payload.token,
         };
      case USER_LOGIN_FAIL:
         return { loading: false };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

export const registerUserReducer = (state = {}, action) => {
   switch (action.type) {
      case USER_REGISTER_REQUEST:
         return { loading: true };
      case USER_REGISTER_SUCCESS:
         return {
            loading: false,
            user: action.payload.user,
            token: action.payload.token,
         };
      case USER_REGISTER_FAIL:
         return { loading: false };
      case USER_LOGOUT:
         return {};
      default:
         return state;
   }
};

export const allUserReducer = (
   state = { users: [], loading: true },
   action
) => {
   switch (action.type) {
      case GET_ALL_USERS_REQUEST:
         return { loading: true };
      case GET_ALL_USERS_SUCCESS:
         return {
            loading: false,
            users: action.payload,
         };
      case GET_ALL_USERS_FAIL:
         return { loading: false };
      default:
         return state;
   }
};
