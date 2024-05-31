import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import baseUrl from "../../../url";
import { PortfolioInfoContext } from "../portfolioState/portfolioContext";
import "./styles.css";

const PersuasivePortfolioTemplate = () => {
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
      location.pathname !== "/portfolioTemplates/persuasivePortfolioTemplate"
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
        <nav className="navbar navbar-expand-lg" style={{ paddingTop: "10px" }}>
          <div className="container">
            <div className="navbar-brand">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ color: "black" }}
                    href="#services"
                  >
                    Objectives
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ color: "black" }}
                    href="#projects"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div id="about" className="basic-1 bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="text-container first">
                <h1>Hi there I'm {personalInformation.name},</h1>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-container second">
                <div className="time">Email Address</div>
                <h6>{personalInformation.email}</h6>
              </div>
              <div className="social-icons" style={{ marginTop: "20px" }}>
                {personalInformation.linkedin && (
                  <a
                    href={personalInformation.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      margin: "0 10px",
                      color: "white",
                      fontSize: "2rem",
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#fff",
                      lineHeight: "50px",
                      textAlign: "center",
                      backgroundColor: "#333",
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
                      color: "white",
                      fontSize: "2rem",
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "#fff",
                      lineHeight: "50px",
                      textAlign: "center",
                      backgroundColor: "#333",
                    }}
                  >
                    <i className="fab fa-github "></i>
                  </a>
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-container third">
                <div className="time">Phone Number</div>
                <h6>{personalInformation.phone}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="services" className="basic-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="h2-heading">Objective</h2>
              <p
                className="p-heading"
                dangerouslySetInnerHTML={{ __html: objectives }}
              ></p>
            </div>
          </div>
        </div>
      </div>
      <div id="projects" className="basic-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="h2-heading">Delivered projects</h2>
              <p className="p-heading">
                Listed below are some of the most representative projects I've
                worked on.
              </p>
            </div>
          </div>
          <div className="row">
            {projectInformation.map((project, index) => (
              <div className="col-lg-12" key={index}>
                <div className="text-container">
                  <div className="image-container">
                    <img
                      className="img"
                      style={{ width: "100%", height: "auto" }}
                      src={`data:image/png;base64,${project.image}`}
                      alt="alternative"
                    />
                  </div>
                  <p>
                    {" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    ></span>
                    <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>
                      From: {project.started_from}
                    </p>
                    <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>
                      To {project.ended_at}
                    </p>
                    <a
                      className="btn btn-primary"
                      target="_blank"
                      href={project.link}
                    >
                      details
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center footer mt-5">
        <p style={{ color: "white" }}>
          © {new Date().getFullYear()} All rights reserved.{" "}
          {personalInformation.name}
        </p>
      </footer>
    </>
  );
};

export default PersuasivePortfolioTemplate;
