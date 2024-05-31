import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./index.css"; // Make sure to import your styles here
import manImg from "./assets/imgs/man.png";
import { useLocation } from "react-router-dom";
import baseUrl from "../../../../url";
import { PortfolioInfoContext } from "../../portfolioState/portfolioContext";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

const CorporatePortfolio = () => {
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
      location.pathname !== "/portfolioTemplates/corporatePortfolioTemplate"
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
    <div data-spy="scroll" data-target=".navbar" data-offset="40" id="home">
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#695aa6" }}>
        <Toolbar>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <ScrollLink to="about" smooth={true} duration={500} offset={-70}>
              <Button sx={{ width: "10rem", color: "#f8f9fa" }}>About</Button>
            </ScrollLink>
            <ScrollLink
              to="objective"
              smooth={true}
              duration={500}
              offset={-70}
            >
              <Button color="inherit" sx={{ width: "10rem" }}>
                Objective
              </Button>
            </ScrollLink>
            <ScrollLink to="projects" smooth={true} duration={500} offset={-70}>
              <Button color="inherit" sx={{ width: "10rem" }}>
                Projects
              </Button>
            </ScrollLink>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Page Header */}
      <header id="home" className="header">
        <div className="overlay" style={{ zIndex: -1 }}></div>
        <div className="header-content container">
          <h1 className="header-title">
            <span className="up">HI!</span>
            <span className="down" style={{ fontSize: "4.5rem" }}>
              I am {personalInformation.name}
            </span>
          </h1>
          <a
            className="btn btn-primary"
            style={{ color: "white", backgroundColor: "#695aa6" }}
            href="#about"
          >
            More Info Below
          </a>
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
                  backgroundColor: "#695aa6",
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
                  backgroundColor: "#695aa6",
                }}
              >
                <i className="fab fa-github "></i>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="section pt-0" id="about">
        <div className="container text-center">
          <div className="about-caption mb-5">
            <p className="section-subtitle">Who Am I ?</p>
            <h2 className="section-title mb-3">About Me</h2>
            <p>
              I am {personalInformation.name}. My Email address is{" "}
              {personalInformation.email}. and My phone Number is{" "}
              {personalInformation.phone}
            </p>
          </div>
        </div>
      </section>

      {/* Objective Section */}
      <section className="section pt-0" id="objective">
        <div className="container text-center">
          <div className="about-caption">
            <h2 className="section-title mb-3">Objective</h2>
            <p dangerouslySetInnerHTML={{ __html: objectives }} />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="container text-center">
          <h6 className="section-title mb-6">Projects</h6>
          {projectInformation.map((project) => (
            <div key={project._id} className="blog-card">
              <div className="blog-card-header">
                <img
                  src={`data:image/png;base64,${project.image}`}
                  className="blog-card-img"
                  alt="Blog Post"
                />
              </div>
              <div className="blog-card-body">
                <h5 className="blog-card-title">{project.title}</h5>
                <div
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
                <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>
                  From: {project.started_from}
                </p>
                <p style={{ fontSize: "0.8rem", marginBottom: "0" }}>
                  To {project.ended_at}
                </p>
                <a
                  href={project.link}
                  style={{ color: "#695aa6", textDecoration: "none" }}
                  target="_blank"
                >
                  {project.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#695aa6",
          color: "white",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <Typography variant="footer" style={{ color: "white" }}>
          &copy; {new Date().getFullYear()} {personalInformation.name}. All
          rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default CorporatePortfolio;
