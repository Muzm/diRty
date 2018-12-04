const lyric = (store = {}, action) => {
  switch(action.type) {
    /*case "SET_AR_NAME":
    return Object.assign({}, store, {arName: action.arName})*/
    case "SET_CURRENT_TIME":
    return Object.assign({}, store, {currentTime: action.currentTime})
    default:
    return store
  }
}

export default lyric
