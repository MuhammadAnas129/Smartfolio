import React, { useContext, useEffect, useState, appState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import TableRow from "./component/table/index";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../url";
import { PortfolioInfoContext } from "../../layouts/portfolioTemplates/portfolioState/portfolioContext";
// import appContext from "../../appState/appContext";
let tableItemStyle = {
  fontSize: "12px",
  fontWeight: "600",
  width: "25%",
};
const PortfolioDashboard = () => {
  // const appState = useContext(appContext)
  // const { setResum } = appState();
  const PortfolioState = useContext(PortfolioInfoContext);
  const {
    showSideCv,
    setShowSideCv,
    currentState,
    setCurrentState,
    projectInformation,
    setProjectInformation,
    personalInformation,
    setPersonalInformation,
    setCurrentProject,
    ...data
  } = PortfolioState;
  const [Portfolio, setPortfolio] = useState([]);
  const navigator = useNavigate();
  const getData = async () => {
    await fetch(
      `${baseUrl}/portfolio/get-portfolios?user_id=${localStorage.getItem(
        "_id"
      )}`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("get portfolio response: ", response);
        if (response.status) {
          setPortfolio(response.results);
        }
      });
  };
  // useEffect(() => {
  //   getData()

  // }, [])

  const setUpdatePortfolio = (data2) => {
    console.log("Update portfolio Data: ", data2);

    setProjectInformation(data2.projectInformation);
    setPersonalInformation(data2.personalInformation);
    setCurrentProject({});

    // data = data2;
  };
  useEffect(() => {
    console.log("portfolio State: ----> :=> ", PortfolioState);
    if (localStorage.getItem("_id")) {
      getData();
    }
  }, [localStorage.getItem("_id")]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Portfolio && Portfolio.length > 0) {
      setLoading(false);
    }
  }, [Portfolio]);

  return (
    <Container sx={{ marginTop: "140px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">My Recent Portfolio</Typography>
        <a href="/portfolioTemplates">
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "none",
              backgroundColor:'#40A578',
              '&:hover': {
                backgroundColor: '#40A578',
                border: 'none'
            },
            }}
            onClick={() => {
              // navigator('/ResumeQuestionare')
            }}
          >
            Create New Portfolio
          </Button>
        </a>
      </Box>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: "1080px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
              padding: "50px 0px 20px 0px",
            }}
          >
            <Typography sx={tableItemStyle}>USER</Typography>
            <Typography sx={tableItemStyle}>MODIFICATION</Typography>
            <Typography sx={tableItemStyle}>CREATION</Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "600",
                width: "25%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              ACTIONS
            </Typography>
          </Box>
        </Box>
        <>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ minWidth: "1080px" }}>
              {Portfolio.map((item, index) => (
                <TableRow
                  key={index}
                  name={item.user?.fullName}
                  modified={item.updated_at?.substring(0, 10)}
                  created={item.created_at?.substring(0, 10)}
                  onDelete={async () => {
                    await fetch(
                      `${baseUrl}/portfolio/delete-portfolio?_id=${item._id}`,
                      { method: "DELETE" }
                    )
                      .then((res) => res.json())
                      .then((response) => {
                        console.log("delete response: ", response);
                        alert("Deleted!");
                        getData();
                      });
                  }}
                  onEdit={() => {
                    setPortfolio(item.text);
                    setUpdatePortfolio(item);
                    navigator(
                      `/portfolioTemplates/${item.portfolioName}?_id=${item._id}`
                    );
                  }}
                  onClick={() => {
                    setPortfolio(item);
                    setUpdatePortfolio(item);
                    navigator(
                      `/portfolioTemplates/${item.portfolioName}?_id=${item._id}`
                    );
                  }}
                />
              ))}
            </Box>
          )}
        </>
      </Box>
    </Container>
  );
};

export default PortfolioDashboard;
