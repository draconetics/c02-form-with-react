import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

const finalReducer = combineReducers({ form: formReducer });
export default createStore(finalReducer);
