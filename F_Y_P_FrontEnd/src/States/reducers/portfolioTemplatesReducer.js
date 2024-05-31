export const addPortfolioTemplatesReducer = (state = [], action) => {
  if (action.type === "addPortfolioTemplates") {
    if (action.payload) return action.payload;
    return null;
  } else {
    return state;
  }
};
