export const portfolioReducer = (state = [], action) => {
  if (action.type == "addPortfolio") {
    state = [...state, action];
    return state;
  } else {
    return state;
  }
};
