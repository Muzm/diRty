import { combineReducers } from "redux";
import list from './playList';
import lyric from './lyric'

export default combineReducers({
  list,
  lyric
});