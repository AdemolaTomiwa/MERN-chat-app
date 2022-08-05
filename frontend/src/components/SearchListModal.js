import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userActions';
import Loader from './Loader';
import Message from './Message';
import User from './User';

const SearchListModal = ({ closeModal }) => {
   const dispatch = useDispatch();

   const [search, setSearch] = useState('');

   const allUserState = useSelector((state) => state.allUsers);
   const { users, loading } = allUserState;

   const getChatState = useSelector((state) => state.getChat);
   const { currentChat } = getChatState;

   console.log(currentChat);

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(getAllUsers(search));
      if (search.length === 0) return setSearch('');
   }, [search, dispatch]);

   const handleSearch = (e) => {
      setSearch(e.target.value);

      dispatch(getAllUsers(search));
   };

   return (
      <>
         <div className="searchlistmodal">
            <div className="head">
               <h4>Search users</h4>
               <span onClick={closeModal}>&times;</span>
            </div>
            <div className="search-box">
               <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search users..."
               />
            </div>
            {loading && <Loader />}
            <div className="users-list">
               {users?.map((user) => (
                  <User key={user._id} user={user} />
               ))}
            </div>
         </div>
         {msg && <Message msg={msg} variant="error" />}
      </>
   );
};

export default SearchListModal;
