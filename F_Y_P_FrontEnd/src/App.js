import React from "react";
// import SignUp from "views/signup";
import Navbar from "./components/navBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import AppState from "./appState/appState";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import { ToastContainer } from "react-toastify";
// import { useContext, useEffect, useState } from "react";
// react-router components
// import { Navigate, useNavigate } from "react-router-dom";
// @mui material components
// import CssBaseline from "@mui/material/CssBaseline";
// import ResumeState from "layouts/Templates/resumeState/resumeState";
import ResumeState from "./layouts/Templates/resumeState/resumeState";
import PortfolioState from "./layouts/portfolioTemplates/portfolioState/portfolioState";
import "./App.css";
// import AccountScreen from "layouts/accountScreen"
// import Appcontext from "States/appContext";
import "react-toastify/dist/ReactToastify.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import ErrorPage from "layouts/errorPage"

function App() {
  return (
    <AppState>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <PortfolioState>
            <ResumeState>
              {localStorage.getItem("name") && <Navbar />}
              <ToastContainer />
              <Routes>
                {routes.map((item, index) => (
                  <Route
                    exact
                    path={item.route}
                    element={item.component}
                    key={index}
                  />
                ))}
              </Routes>
            </ResumeState>
          </PortfolioState>
        </DndProvider>
      </Router>
    </AppState>
  );
}

export default App;
