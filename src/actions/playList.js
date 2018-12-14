let MODIFY_PLAYLIST = (value) => {
  return {
    type: "MODIFY_PLAYLIST",
    playList: value.playList,
    playIndex: value.playIndex,
    playListId: value.playListId
  };
};

let PLAY_INDEX = (index) => {
  return {
    type: 'PLAY_INDEX',
    playIndex: index
  }
}

export default {
  MODIFY_PLAYLIST,
  PLAY_INDEX
};