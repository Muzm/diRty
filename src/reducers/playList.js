let playList = (state = {}, action) => {
  switch(action.type) {
    case "MODIFY_PLAYLIST":
      return Object.assign({}, state, {playList: action.playList, playIndex: action.playIndex || state.playIndex || 0, playListId: action.playListId});
    case "PLAY_INDEX":
      return Object.assign({}, state, {playIndex: action.playIndex});
    default:
      return state;
  }
};

export default playList;