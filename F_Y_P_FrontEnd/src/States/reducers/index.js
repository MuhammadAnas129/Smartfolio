import { combineReducers } from "redux";
import { resumeReducer } from "./resumeReducer";
import { portfolioReducer } from "./portfolioReducer";
import { addResumeTemplatesReducer } from "./resumeTemplatesReducer";
import { addPortfolioTemplatesReducer } from "./portfolioTemplatesReducer";
import { addPersonalInfo } from "../../States/action-creators/index";
import { addResumeTemplateId } from "../../States/action-creators/index";
import { addPortfolioTemplateId } from "../../States/action-creators/index";
const reducers = combineReducers({
  Resume: resumeReducer,
  Portfolio: portfolioReducer,
  Templates: addResumeTemplatesReducer,
  PortfolioTemplates: addPortfolioTemplatesReducer,
  PersonalInformation: addPersonalInfo,
  ResumeTemplateId: addResumeTemplateId,
  PortfolioTemplateId: addPortfolioTemplateId,
});
export default reducers;
