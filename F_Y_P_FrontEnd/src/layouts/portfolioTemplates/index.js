import React, { useContext } from "react";
import { Container, Grid, Box, Button, Typography } from "@mui/material";
import "./index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPortfolioTemplates } from "../../States/action-creators";
import { Link } from "react-router-dom";
// import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import AppContext from "../../States/appContext";
import { PortfolioInfoContext } from "./portfolioState/portfolioContext";
import { ClipLoader } from "react-spinners";
import img1 from "../../../src/assets/images/portfolio-templates/templates1.png";
export default function Default() {
  const userPortfolios = useContext(PortfolioInfoContext);
  const {
    setUserCvs,
    setShowDeleteDialog,
    disableDelete,
    setDeleteTemplatwId,
    setShowSideCv,
    setobjectives,
    setLanguageInformation,
    setSkillInformation,
    setExperienceInformation,
    setEducationInformation,
    setPersonalInformation,
  } = userPortfolios;
  const dispatch = useDispatch();
  const portfolioTemplates = useSelector((state) => state.PortfolioTemplates);
  const app = useContext(AppContext);
  const { baseUrl } = app;
  useEffect(() => {
    const apiCall = async () => {
      await fetch(`${baseUrl}portfolioTemplate/get-portfolio-template`)
        .then((res) => res.json())
        .then((response) => {
          console.log(
            "portfolioTemplate/get-portfolio-template result: ",
            response.results
          );
          dispatch(addPortfolioTemplates(response.results));
        });
    };
  
    apiCall();
  }, []);
  const onClickHandle = async (portfoliotTemplate_id) => {
 
    if (localStorage.getItem("user_id")) {
      await fetch(`${baseUrl}resumes/add-resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portfolio_template_id: portfoliotTemplate_id,
          user_id: localStorage.getItem("user_id"),
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          localStorage.setItem("portfolio_id", response.results.portfolios_id);
        });
    } else {
    }
  };
  if (portfolioTemplates && !portfolioTemplates.length) {
    return (
      <>
        {/* <DashboardNavbar /> */}
        <ClipLoader
          color={"#40A578"}
          loading={true}
          cssOverride={{
            display: "block",
            margin: "20% auto",
            borderColor: "red",
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </>
    );
  }

  return (
    <Box>
      {/* <DashboardNavbar /> */}
      <Container className="mt-20">
        <center>
          <Typography variant="h5" my={3} color={"#40A578"} fontWeight={"600"}>
            Select A Specific Portfolio Template To Customize
          </Typography>
        </center>
        {portfolioTemplates ? (
          <Grid
            container
            columnSpacing={18}
            rowSpacing={5}
            marginTop={0}
            marginBottom={2}
          >
            {portfolioTemplates.map((template, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                <Box position={"relative"} className="template-grid-item-main">
                  <Link
                    to={`/portfolioTemplates/${template.templateName}?id=${template._id}`}
                  >
                    <div
                      onClick={() => {
                        onClickHandle(template._id);
                      }}
                      className="template-grid-hover"
                    >
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#40A578",
                          color: "white",
                          top: "80%",
                          left: "50%",
                          transform: "translate(-50%,-20%)",
                        }}
                      >
                        Choose Template
                      </Button>
                    </div>
                  </Link>
                  <img
                    alt="template"
                    className="template-grid-items"
                    src={`${baseUrl}${template.templateImage}`}
                    height="100%"
                    width="100%"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <center>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "800",
                marginTop: "4vh",
              }}
            >
              No Templates to display
            </Typography>
          </center>
        )}
      </Container>
    </Box>
  );
}
