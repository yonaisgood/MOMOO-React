import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import { SignupData, PageData } from './model';
import pageReducer from './pageReducer';

export interface RootState {
  signupReducer: SignupData;
  pageReducer: PageData;
}

const rootReducer = combineReducers({ signupReducer, pageReducer });
console.log(rootReducer);
export default rootReducer;
