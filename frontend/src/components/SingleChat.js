import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SingleChat = () => {
   const getChatState = useSelector((state) => state.getChat);
   const { currentChat } = getChatState;

   return currentChat ? (
      <div className="chat-box">
         <div className="head">
            <h3>Tomiwa Adelae</h3>
            <div className="icon">
               <i className="fas fa-eye"></i>
            </div>
         </div>
         <div className="content">
            <div className="messages"></div>
            <form>
               <div className="input">
                  <input type="text" placeholder="Enter a message..." />
               </div>
               <div className="button">
                  <button className="btn btn-success">Send</button>
               </div>
            </form>
         </div>
      </div>
   ) : (
      <div className="no-message-box">
         <h4>Click on a user to start chatting</h4>
      </div>
   );
};

export default SingleChat;
