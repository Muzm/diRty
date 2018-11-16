let MODIFY_PLAYLIST = (value) => {
  return {
    type: "MODIFY_PLAYLIST",
    value: value.playList,
    playIndex: value.playIndex
  };
};

let PLAY_INDEX = (index) => {
  return {
    type: "PLAY_INDEX",
    value: index
  };
};

let FIXED_ID = (id) => {
  return {
    type: "FIXED_ID",
    vlaue: id
  }
}

export default {
  MODIFY_PLAYLIST,
  PLAY_INDEX,
  FIXED_ID
};