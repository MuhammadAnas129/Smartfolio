// import CreateResume from "components/contactForm";
import Login from "./views/login";
import Signup from "./views/signup/index";
// import Dashboard from 'views/dashboard'
import Questionare from "./views/letterQuestionare";
// import Questionare from './views/letterQuestionare/index';
import ResumeMaker from "./layouts/Templates";
import PortfolioDashboard from "./views/PortfolioDashboard";
import ResumeDashboard from "./views/ResumeDashboard";
// import ResumeQuestionare from "./views/ResumeQuestionare";
import Home from "./views/homepage/index";
import LetterDashboard from "./views/letterDashboard";
import LetterView from "./views/letterView/index";

// Argon Dashboard 2 MUI layouts
import Templates from "./layouts/Templates";
import CorporateResumeTemplate from "./layouts/Templates/corporateResumeTemplate";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";
import Dashboard from "./layouts/dashboard";
import PortfolioTemplates from "./layouts/portfolioTemplates";
import CorporatePortfolioTemplate from "./layouts/portfolioTemplates/corporatePortfolioTemplate";
import CorporatePortfolio from "./layouts/portfolioTemplates/corporatePortfolioTemplate/components";
import PersuasivePortfolioTemplate from "./layouts/portfolioTemplates/persuasivePortfolioTemplate";
import RelevantPortfolioTemplate from "./layouts/portfolioTemplates/relevantPortfolioTemplate";
// Argon Dashboard 2 MUI components
import ForgetPassword from "./layouts/authentication/forget-password";
import LoginPage from "./layouts/authentication/sign-in";
import SignupPage from "./layouts/authentication/sign-up";
// import AccountScreen from './layouts/accountScreen';
import { Box } from "@mui/material";
import Settings from "./layouts/accountScreen/components/settings";
import BlogDetailed from "./layouts/blogDetailed";
import ErrorPage from "./layouts/errorPage";
import LetterQuestionareAuto from "./views/letterAuto";
const routes = [
  {
    name: "Create Resume",
    route: "/LetterQuestionare-auto",
    component: <LetterQuestionareAuto />,
  },
  {
    name: "Login",
    route: "/login",
    component: <Login />,
  },
  {
    name: "Signup up",
    route: "/signup",
    component: <Signup />,
  },
  {
    name: "HomePage",
    route: "/",
    component: <Home />,
  },
  {
    name: "LetterQuestionare",
    route: "/LetterQuestionare",
    component: <Questionare />,
  },
  {
    name: "CoverLetter",
    route: "/LetterDashboard",
    component: <LetterDashboard />,
  },
  {
    name: "letter View",
    route: "/letter-view",
    component: <LetterView />,
  },
  {
    name: "Resume",
    route: "/ResumeDashboard",
    component: <ResumeDashboard />,
  },
  // {
  //   name: "resumeQuestionare",
  //   route: "/resumeQuestionare",
  //   component: <ResumeQuestionare />,
  // },
  {
    name: "resumeQuestionare",
    route: "/resume-maker",
    component: <ResumeMaker />,
  },
  {
    name: "Portfolio",
    route: "/PortfolioDashboard",
    component: <PortfolioDashboard />,
  },
  /* ************************************************************************************* */
  {
    type: "route",
    name: "portfolioTemplates",
    key: "portfolioTemplates",
    route: "/portfolioTemplates",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <PortfolioTemplates />,
  },
  {
    type: "route",
    name: "corporate-Portfolio-Template",
    key: "corporate-Portfolioe-Template",
    route: "portfolioTemplates/corporatePortfolioTemplate",
    showNavbar: false,
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporatePortfolioTemplate />,
  },
  {
    type: "route",
    name: "attractive-Portfolio-Template",
    key: "attractive-Portfolio-Template",
    route: "portfolioTemplates/attractivePortfolioTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporatePortfolioTemplate />,
  },
  {
    type: "route",
    name: "relevant-Portfolio-Template",
    key: "relevant-Portfolio-Template",
    route: "portfolioTemplates/relevantPortfolioTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporatePortfolioTemplate />,
  },
  {
    type: "route",
    name: "relevant-Portfolio-Template",
    key: "relevant-Portfolio-Template",
    route: "portfolioTemplates/persuasivePortfolioTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporatePortfolioTemplate />,
  },
  {
    type: "route",
    name: "corporate-Portfolio-url",
    key: "corporate-Portfolioe-url",
    route: "userPortfolio/corporatePortfolio",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporatePortfolio />,
  },
  {
    type: "route",
    name: "corporate-Portfolio-url",
    key: "corporate-Portfolioe-url",
    route: "userPortfolio/persuasivePortfolioTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <PersuasivePortfolioTemplate />,
  },
  {
    type: "route",
    name: "corporate-Portfolio-url",
    key: "corporate-Portfolioe-url",
    route: "userPortfolio/relevantPortfolioTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <RelevantPortfolioTemplate />,
  },
  {
    type: "route",
    name: "blogDetailed",
    key: "blogDetailed",
    route: "/blogDetailed/blog_id=:id",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <BlogDetailed />,
  },
  {
    type: "route",
    name: "settings",
    key: "settings",
    route: "/settings",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <Settings />,
  },
  {
    type: "route",
    name: "errorPage",
    key: "errorPage",
    route: "/errorPage",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <ErrorPage />,
  },
  {
    type: "route",
    name: "dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "forget-password",
    key: "forget-password",
    route: "/forget-password",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <ForgetPassword />,
  },
  // // {
  // //     type: "route",
  // //     name: "blogs",
  // //     key: "blogs",
  // //     route: "/blogs",
  // //     icon: (
  // //         <Box
  // //             component="i"
  // //             color="warning"
  // //             fontSize="14px"
  // //             className="ni ni-single-copy-04"
  // //         />
  // //     ),
  // //     component: <Blogs />,
  // // },
  // // {
  // //     type: "route",
  // //     name: "enter-otp",
  // //     key: "enter-otp",
  // //     route: "/enter-otp",
  // //     icon: (
  // //         <Box
  // //             component="i"
  // //             color="warning"
  // //             fontSize="14px"
  // //             className="ni ni-single-copy-04"
  // //         />
  // //     ),
  // //     component: <OtpEnter />,
  // // },
  // // {
  // //     type: "route",
  // //     name: "reset-password",
  // //     key: "reset-password",
  // //     route: "/reset-password",
  // //     icon: (
  // //         <Box
  // //             component="i"
  // //             color="warning"
  // //             fontSize="14px"
  // //             className="ni ni-single-copy-04"
  // //         />
  // //     ),
  // //     component: <OtpEnter />,
  // },
  {
    type: "route",
    name: "login",
    key: "login",
    route: "/login",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <LoginPage />,
  },
  {
    type: "route",
    name: "signup",
    key: "signup",
    route: "/signup",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <SignupPage />,
  },
  {
    type: "route",
    name: "templates",
    key: "templates",
    route: "/templates",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <Templates />,
  },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: (
      <Box
        component="i"
        color="info"
        fontSize="14px"
        className="ni ni-collection"
      />
    ),
    component: <SignUp />,
  },
  {
    type: "route",
    name: "relevant-resume-template",
    key: "relevant-resume-template",
    route: "/templates/relevantResumeTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporateResumeTemplate />,
  },
  {
    type: "route",
    name: "traditional-Resume-Template",
    key: "traditional-Resume-Template",
    route: "/templates/traditionalResumeTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporateResumeTemplate />,
  },
  {
    type: "route",
    name: "corporate-Resume-Template",
    key: "corporate-Resume-Template",
    route: "templates/corporateResumeTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporateResumeTemplate />,
  },
  {
    type: "route",
    name: "attractive-Resume-Template",
    key: "attractive-Resume-Template",
    route: "templates/attractiveResumeTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporateResumeTemplate />,
  },
  {
    type: "route",
    name: "persuasive-Resume-Template",
    key: "persuasive-Resume-Template",
    route: "templates/persuasiveResumeTemplate",
    icon: (
      <Box
        component="i"
        color="warning"
        fontSize="14px"
        className="ni ni-single-copy-04"
      />
    ),
    component: <CorporateResumeTemplate />,
  },
];
export default routes;
