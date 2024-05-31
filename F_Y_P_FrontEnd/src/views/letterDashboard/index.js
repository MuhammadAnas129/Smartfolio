import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TableRow from "./component/table/index";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../url";
// import appContext from "appState/appContext";
import appContext from "../../appState/appContext";
let tableItemStyle = {
  fontSize: "12px",
  fontWeight: "600",
  width: "25%",
};
const LetterDashboard = () => {
  const appState = useContext(appContext);
  const { setLetter } = appState;
  const [coverLetters, setCoverLetters] = useState([
    {
      user: "Wahab",
      updated_at: "23/11/2023",
      created_at: "18/11/2023",
      strenth: "17",
    },
    {
      user: "Usman",
      updated_at: "22/11/2023",
      created_at: "17/11/2023",
      strenth: "11",
    },
    {
      user: "Suleman",
      updated_at: "21/11/2023",
      created_at: "16/11/2023",
      strenth: "19",
    },
    {
      user: "Anas",
      updated_at: "20/11/2023",
      created_at: "15/11/2023",
      strenth: "21",
    },
  ]);
  const [showPopup, setshowPopup] = useState(false);
  const navigator = useNavigate();
  const getData = async () => {
    await fetch(
      `${baseUrl}/cover-letter/get?user_id=${localStorage.getItem("_id")}`
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.status) {
          setCoverLetters(response.result);
        }
      });
  };
  // useEffect(() => {
  //   getData()

  // }, [])
  useEffect(() => {
    if (localStorage.getItem("_id")) {
      getData();
    }
  }, [localStorage.getItem("_id")]);

  return (
    <>
      {showPopup && (
        <Box
          sx={{
            position: "fixed",
            height: "100%",
            width: "100%",
            left: "0",
            top: "0",
            zIndex: "9999999",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          onClick={() => setshowPopup(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              backgroundColor: "white",
              maxHeight: "90vh",
              width: {
                xs: "80vw",
                sm: "80vw",
                md: "35vw",
                lg: "35vw",
              },
              padding: "40px",
              borderRadius: "16px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography>
              Choose Which Method you want to generate cover letter by:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "40px"
              }}
            >
              <Button
              sx={{
                backgroundColor:'#40A578',
                '&:hover': {
                  backgroundColor: '#40A578',
                  border: 'none'
              },
              }}
                onClick={() => navigator("/LetterQuestionare")}
                variant="contained"
              >
                Manual
              </Button>
              <Button
              sx={{
                backgroundColor:'#40A578',
                '&:hover': {
                  backgroundColor: '#40A578',
                  border: 'none'
              },
              }}
                onClick={() => navigator("/LetterQuestionare-auto")}
                variant="contained"
              >
                Upload my Resume
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Container sx={{ marginTop: "140px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">My Recent Cover Letters</Typography>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "none",
              backgroundColor: '#40A578',
              '&:hover': {
                backgroundColor: '#40A578',
                border: 'none'
            },
            }}
            onClick={() => {
              setshowPopup(true);
            }}
          >
            Create New Cover Letter
          </Button>
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
          <Box sx={{ minWidth: "1080px" }}>
            {coverLetters.map((item, index) => (
              <TableRow
                key={index}
                name={item.user?.fullName}
                modified={item.updated_at?.substring(0, 10)}
                created={item.created_at?.substring(0, 10)}
                onDelete={async () => {
                  await fetch(
                    `${baseUrl}/cover-letter/delete?_id=${item._id}`,
                    { method: "DELETE" }
                  )
                    .then((res) => res.json())
                    .then((response) => {
                      console.log(response);
                      alert("Deleted");
                      getData();
                    });
                }}
                onEdit={() => {
                  setLetter(item.text);
                  navigator(`/letter-view?_id=${item._id}`);
                }}
                onClick={() => {
                  setLetter(item.text);
                  navigator(`/letter-view?view=true`);
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LetterDashboard;
