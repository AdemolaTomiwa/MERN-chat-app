import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatList from '../components/ChatList';
import Header from '../components/Header';
import SingleChat from '../components/SingleChat';

const ChatsPage = () => {
   const navigate = useNavigate();

   const userState = useSelector((state) => state.userLogin);
   const { user } = userState;

   useEffect(() => {
      if (!user) return navigate('/');
   }, [navigate, user]);
   return (
      <div className="chatspage">
         <Header />
         <main>
            <ChatList />
            <SingleChat />
         </main>
      </div>
   );
};

export default ChatsPage;
