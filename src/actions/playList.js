let MODIFY_PLAYLIST = (value) => {
  return {
    type: "MODIFY_PLAYLIST",
    value: value.playList,
    playIndex: value.playIndex
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