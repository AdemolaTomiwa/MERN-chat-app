import React, { Component } from 'react';
import './css/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import ChatsPage from './screens/ChatsPage';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <div>
                  <Routes>
                     <Route path="/" element={<LoginPage />} />
                     <Route path="/register" element={<RegisterPage />} />
                     <Route path="/chats" element={<ChatsPage />} />
                  </Routes>
               </div>
            </Router>
         </Provider>
      );
   }
}

export default App;
