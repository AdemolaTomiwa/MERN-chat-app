import {
   createStore,
   applyMiddleware,
   combineReducers,
   // compose
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
   allUserReducer,
   loginUserReducer,
   registerUserReducer,
} from './reducers/userReducers';
import { errorReducer } from './reducers/errorReducers';
import { getChatReducer } from './reducers/chatReducers';

const reducer = combineReducers({
   error: errorReducer,
   userLogin: loginUserReducer,
   userRegister: registerUserReducer,
   allUsers: allUserReducer,
   getChat: getChatReducer,
});

const userInfoFromStorage = localStorage.getItem('user')
   ? JSON.parse(localStorage.getItem('user'))
   : null;

const userTokenFromStorage = localStorage.getItem('token')
   ? JSON.parse(localStorage.getItem('token'))
   : null;

const initialState = {
   userLogin: { user: userInfoFromStorage, token: userTokenFromStorage },
   userRegister: { user: userInfoFromStorage, token: userTokenFromStorage },
};

const middleware = [thunk];

// // For Development
const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

// For Production
// const store = createStore(
//     reducer,
//     initialState,
//     compose(applyMiddleware(...middleware))
//  );

export default store;
