export const addResume = (data) => {
  return (dispatch) => {
    dispatch({
      type: "addResume",
      payload: data,
    });
  };
};
export const addResumeTemplates = (data) => {
  return (dispatch) => {
    dispatch({
      type: "addResumeTemplates",
      payload: data,
    });
  };
};
export const addPersonalInfo = (data) => {
  return (dispatch) => {
    dispatch({
      type: "addPersonalInfo",
      payload: data,
    });
  };
};
export const addResumeTemplateId = (data) => {
  return (dispatch) => {
    dispatch({
      type: "addResumeTemplateId",
      payload: data,
    });
  };
};

export const addPortfolio = (data) => {
  return (dispatch) => {
    dispatch({
      type: "addPortfolio",
      payload: data,
    });
  };
};
export const addPortfolioTemplates = (data) => {
  return (dispatch) => {
    dispatch({
      type: "addPortfolioTemplates",
      payload: data,
    });
  };
};
// export const addPersonalInfo = (data) => {
//     return (dispatch) => {
//         dispatch({
//             type: "addPersonalInfo",
//             payload: data
//         })
//     }
// }
export const addPortfolioTemplateId = (data) => {
  return (dispatch) => {
    dispatch({
      type: "addPortfolioTemplateId",
      payload: data,
    });
  };
};
