import {
   GET_CHAT_FAIL,
   GET_CHAT_REQUEST,
   GET_CHAT_SUCCESS,
} from '../constants/chatConstants';

export const getChatReducer = (state = {}, action) => {
   switch (action.type) {
      case GET_CHAT_REQUEST:
         return { loadingChat: true };
      case GET_CHAT_SUCCESS:
         return { loadingChat: false, currentChat: action.payload };
      case GET_CHAT_FAIL:
         return { loadingChat: false };
      default:
         return state;
   }
};
