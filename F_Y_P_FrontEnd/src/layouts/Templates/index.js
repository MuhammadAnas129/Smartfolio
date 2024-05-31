import React, { useContext } from "react";
import { Container, Grid, Box, Button, Typography } from "@mui/material";
import "./index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeTemplates } from "../../States/action-creators";
import { Link } from "react-router-dom";
// import  DashboardNavbar  from '../../examples/Navbars/DashboardNavbar';
import AppContext from "../../States/appContext";
import { TemplateInfoContext } from "./resumeState/resumeContext";
import { ClipLoader } from "react-spinners";
export default function Default() {
  const dispatch = useDispatch();
  const templates = useSelector((state) => state.Templates);
  const app = useContext(AppContext);
  const { baseUrl } = app;
  useEffect(() => {
    const apiCall = async () => {
      await fetch(`${baseUrl}resumeTemplate/get-resume-template`)
        .then((res) => res.json())
        .then((response) => {
          dispatch(addResumeTemplates(response.results));
        });
    };
    apiCall();
  }, []);
  const onClickHandle = async (template_id) => {
    if (localStorage.getItem("user_id")) {
      await fetch(`${baseUrl}resumes/add-resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume_template_id: template_id,
          user_id: localStorage.getItem("user_id"),
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          localStorage.setItem("resume_id", response.results.resumes_id);
        });
    } else {
    }
  };
  if (!templates.length) {
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
      {/* <DashboardNavbar/> */}
      <Container className="mt-20">
        <center>
          <Typography variant="h5" my={3} color={"#40A578"} fontWeight={"600"}>
            Select A Specific Resume Template
          </Typography>
        </center>
        {templates ? (
          <Grid
            container
            columnSpacing={18}
            rowSpacing={5}
            marginTop={0}
            marginBottom={2}
          >
            {templates.map((template, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                <Box position={"relative"} className="template-grid-item-main">
                  <Link
                    to={`/templates/${template.template_name}?id=${template.template_id}`}
                  >
                    <div
                      onClick={() => {
                        onClickHandle(template.template_id);
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
                    src={`${baseUrl}${template.template_image}`}
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
