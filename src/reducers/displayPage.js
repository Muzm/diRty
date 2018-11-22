let pageDisplay = (state = {}, action) => {
  switch(action.type) {
    case "USER_FIXED_ID":
      return Object.assign({}, state, {fixedId: action.value});
    case "PAGE_DISPLAY" :
      return Object.assign({}, state, {displayPage: 0});
    default:
     return state;
  }
};

export default pageDisplay;