import axios from 'axios';
import {
   GET_CHAT_FAIL,
   GET_CHAT_REQUEST,
   GET_CHAT_SUCCESS,
} from '../constants/chatConstants';
import { returnErrors } from './errorActions';
import { tokenConfig } from './userActions';

export const getChat = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: GET_CHAT_REQUEST });

      const { data } = await axios.post(
         '/api/chats',
         { id },
         tokenConfig(getState)
      );

      dispatch({ type: GET_CHAT_SUCCESS, payload: data });
   } catch (err) {
      dispatch(returnErrors(err.response.data.msg));
      dispatch({ type: GET_CHAT_FAIL });
   }
};
