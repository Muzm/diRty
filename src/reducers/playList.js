let playList = (state = {}, action) => {
  switch(action.type) {
    case "MODIFY_PLAYLIST":
      let index;
      if(action.playIndex === 0) {
        index = 0;
      } else if(!action.playIndex) {
        index = state.playIndex || 0;
      } else {
        index = action.playIndex;
      }
      return Object.assign({}, state, {playList: action.playList, playIndex: index, playListId: action.playListId});
    case "PLAY_INDEX":
      return Object.assign({}, state, {playIndex: action.playIndex});
    default:
      return state;
  }
};

export default playList;