import { combineReducers } from "redux";
import page from './displayPage';
import list from './playList';
import lyric from './lyric'

export default combineReducers({
  page, 
  list,
  lyric
});