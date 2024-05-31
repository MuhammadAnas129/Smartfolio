export const resumeReducer = (state = [], action) => {
  if (action.type == "addResume") {
    state = [...state, action];
    return state;
  } else {
    return state;
  }
};
