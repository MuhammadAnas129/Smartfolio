import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import baseUrl from "../../../url";
import { PortfolioInfoContext } from "../portfolioState/portfolioContext";
import "./style.css";

const RelevantPortfolioTemplate = () => {
  const templateState = useContext(PortfolioInfoContext);
  const {
    personalInformation: initialPersonalInfo,
    projectInformation: initialProjectInfo,
    objectives: initialObjective,
  } = templateState;
  const [personalInformation, setPersonalInformation] =
    useState(initialPersonalInfo);
  const [projectInformation, setProjectInformation] =
    useState(initialProjectInfo);
  const [objectives, setObjectives] = useState(initialObjective);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    if (
      id &&
      location.pathname !== "/portfolioTemplates/relevantPortfolioTemplate"
    ) {
      axios
        .get(`${baseUrl}/portfolio/get-portfolio?portfolio_id=${id}`)
        .then((response) => {
          const { personalInformation, projectInformation, objectives } =
            response.data.results[0];
          setPersonalInformation(personalInformation);
          setProjectInformation(projectInformation);
          setObjectives(objectives);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setPersonalInformation(initialPersonalInfo);
      setProjectInformation(initialProjectInfo);
      setObjectives(initialObjective);
    }
  }, [
    location.search,
    initialPersonalInfo,
    initialProjectInfo,
    initialObjective,
  ]);

  return (
    <>
      <header>
        <nav className="navbar-expand-lg navbar-light">
          <div className="container">
            <ul className="mb-0">
              <li className="navbar-brand">
                <a className="nav-link" href="#services">
                  Objectives
                </a>
              </li>
              <li className="navbar-brand">
                <a className="nav-link" href="#projects">
                  Projects
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <section id="home" className="intro-section">
        <div className="container">
          <div className="row align-items-center text-white">
            <div className="col-md-6 intros text-start">
              <h1 className="display-2">
                <span className="display-2--intro text-white">
                  Hey!, I'm {personalInformation.name}
                </span>
                <span className="display-2--description lh-base text-white">
                  My Email Address is: {personalInformation.email} and You can
                  contact me on my Phone number {personalInformation.phone}
                </span>
              </h1>

              <div className="social-icons" style={{ marginTop: "20px" }}>
                {personalInformation.linkedin && (
                  <a
                    href={personalInformation.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      margin: "0 10px",
                      fontSize: "2rem",
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#fff",
                      lineHeight: "50px",
                      textAlign: "center",
                    }}
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                )}
                {personalInformation.github && (
                  <a
                    href={personalInformation.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      margin: "0 10px",
                      fontSize: "2rem",
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#fff",
                      lineHeight: "50px",
                      textAlign: "center",
                    }}
                  >
                    <i className="fab fa-github "></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,133.3C672,139,768,213,864,202.7C960,192,1056,96,1152,74.7C1248,53,1344,107,1392,133.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>

      <section id="services" className="services">
        <div className="container">
          <div className="row text-center">
            <h1 className="display-3 fw-bold">Objective</h1>
          </div>
          <div className="col-md-12 border-right"></div>
          <div className="col-md-12">
            <div className="bg-white p-4 text-start">
              <p
                className="fw-light"
                dangerouslySetInnerHTML={{ __html: objectives }}
              ></p>
            </div>
          </div>
        </div>

        <hr style={{ marginLeft: "10%", marginRight: "10%" }}></hr>
        <div id="projects" className="container mt-5">
          <div className="row text-center">
            <h1 className="display-3 fw-bold">Projects</h1>
          </div>
          {projectInformation.map((project, index) => (
            <div className="row" key={index}>
              <div
                className={`col-lg-6 col-md-6 col-sm-12 col-xs-12 services mt-4 ${
                  index % 2 === 0 ? "text-start" : "text-end"
                }`}
              >
                <div className="services__pic">
                  <img
                    src={`data:image/png;base64,${project.image}`}
                    alt={project.title}
                    className="img-fluid"
                  />
                </div>
              </div>
              <div
                className={`col-lg-6 col-md-6 col-sm-12 col-xs-12 services mt-4 ${
                  index % 2 === 0 ? "" : "text-end"
                }`}
              >
                <div className="services__content">
                  <h3 className="display-3--title mt-1">{project.title}</h3>
                  <p
                    className="lh-lg"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  ></p>
                  <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>
                    From: {project.started_from}
                  </p>
                  <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>
                    To {project.ended_at}
                  </p>
                  <a
                    href={project.link}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="rounded-pill btn-rounded border-primary"
                    >
                      Learn more
                      <span>
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center footer mt-5">
        <p style={{ color: "white" }}>
          © {new Date().getFullYear()} All rights reserved.{" "}
          {personalInformation.name}
        </p>
      </footer>

      <a href="#" className="shadow btn-primary rounded-circle back-to-top">
        <i className="fas fa-chevron-up"></i>
      </a>
    </>
  );
};

export default RelevantPortfolioTemplate;
