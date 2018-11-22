import { combineReducers } from "redux";
import page from './displayPage';
import list from './playList';

export default combineReducers({
  page, 
  list
});