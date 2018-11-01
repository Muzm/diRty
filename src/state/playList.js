let MODIFY_PLAYLIST = (value) => {
  return {
    type: "MODIFY_PLAYLIST",
    value: value
  };
};

let PLAY_INDEX = (index) => {
  return {
    type: "PLAY_INDEX",
    value: index
  };
};

export default {
  MODIFY_PLAYLIST,
  PLAY_INDEX
};