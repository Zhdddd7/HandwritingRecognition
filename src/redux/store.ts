// store.ts
import {createStore, combineReducers} from 'redux';
import authReducer from './reducers/auth';
import registerReducer from './reducers/reg';

const rootReducer = combineReducers({
  auth: authReducer,
  reg : registerReducer,
});

const store = createStore(rootReducer);

export default store;
