import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import campaignReducer from './campaignReducer';
import contactReducer from './contactReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  campaigns: campaignReducer,
  contacts: contactReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
