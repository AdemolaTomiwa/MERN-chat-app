import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChat } from '../actions/chatActions';

const User = ({ user }) => {
   const dispatch = useDispatch();
   const getChatHandler = (id) => {
      dispatch(getChat(id));
   };
   return (
      <div onClick={() => getChatHandler(user._id)} className="user">
         <div className="img">
            <img src={user?.picture} alt={user?.name} />
         </div>
         <div className="details">
            <h5>{user?.name}</h5>
            <small>
               <b>Email:</b> {user?.email}
            </small>
         </div>
      </div>
   );
};

export default User;
