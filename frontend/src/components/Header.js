import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import SearchListModal from './SearchListModal';

const Header = () => {
   const dispatch = useDispatch();

   const [showModal, setShowModal] = useState(false);
   const userState = useSelector((state) => state.userLogin);
   const { user } = userState;

   return (
      <>
         {showModal && (
            <SearchListModal
               closeModal={() => {
                  setShowModal(false);
                  dispatch(clearErrors());
               }}
            />
         )}
         <header>
            <div className="content">
               <div className="search-box">
                  <h5 onClick={() => setShowModal(true)}>
                     <i className="fas fa-search"></i>Search
                  </h5>
               </div>
               <div className="logo">
                  <h3>Talk-A-Tive</h3>
               </div>
               <div className="profile">
                  <i className="fas fa-bell"></i>
                  <img src={user?.picture} alt={user?.name} />
               </div>
            </div>
         </header>
      </>
   );
};

export default Header;
