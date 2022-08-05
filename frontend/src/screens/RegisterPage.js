import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import { registerUser } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';
import animationLoading from '../animations/loading.json';
import Message from '../components/Message';

const RegisterPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [show, setShow] = useState(false);

   const userState = useSelector((state) => state.userRegister);
   const { loading, user } = userState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (user) return navigate('/chats');
   }, [user, navigate]);

   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationLoading,
      rendererSettings: {
         preserveAspectRatio: 'xMidYMid slice',
      },
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      dispatch(registerUser({ name, email, password }));

      dispatch(clearErrors());
   };

   return (
      <>
         <div className="registerpage">
            <div className="head">
               <h3>Talk-A-Tive</h3>
            </div>
            <div className="form-body">
               <h4>Register</h4>
               <form onSubmit={handleSubmit}>
                  <div>
                     <label htmlFor="name">
                        Name <span>*</span>
                     </label>
                     <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                     />
                  </div>
                  <div>
                     <label htmlFor="email">
                        Email <span>*</span>
                     </label>
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your enter address"
                     />
                  </div>
                  <div className="password">
                     <label htmlFor="password">
                        Password <span>*</span>
                     </label>
                     <input
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                     />
                     <strong onClick={() => setShow(!show)}>
                        {show ? 'hide' : 'show'}{' '}
                     </strong>
                  </div>
                  <div>
                     <button className="btn btn-blue">
                        {loading ? (
                           <Lottie options={defaultOptions} width={70} />
                        ) : (
                           'Register'
                        )}
                     </button>
                  </div>
                  <strong>
                     Already have an account?<Link to="/">Login</Link>
                  </strong>
               </form>
            </div>
         </div>
         {msg && <Message msg={msg} variant="error" />}
      </>
   );
};

export default RegisterPage;
