let playList = (state = {}, action) => {
  switch(action.type) {
    case "MODIFY_PLAYLIST":
      return Object.assign({}, state, {playList: action.value, playIndex: action.playIndex || 0});
    case "PLAY_INDEX":
      return Object.assign({}, state, {playIndex: action.playIndex});
    default:
      return state;
  }
};

export default playList;