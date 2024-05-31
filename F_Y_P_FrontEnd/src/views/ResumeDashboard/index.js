import React, { useContext, useEffect, useState, appState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TableRow from "./component/table/index";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../url";
import { TemplateInfoContext } from "../../layouts/Templates/resumeState/resumeContext";
// import appContext from "../../appState/appContext";
let tableItemStyle = {
  fontSize: "12px", fontWeight: "600", width: '25%'
}
const ResumeDashboard = () => {
  // const appState = useContext(appContext)
  // const { setResum } = appState();
  const resumeState = useContext(TemplateInfoContext);
  const {
    showSideCv,
    setShowSideCv,
    currentState,
    setCurrentState,
    educationformation,
    setEducationInformation,
    experienceInformation,
    setExperienceInformation,
    skillInformation,
    setSkillInformation,
    languageInformation,
    setLanguageInformation,
    personalInformation,
    setPersonalInformation,
    objectives,
    setobjectives,
    showObjectives,
    setCurrentEducation,
    setCurrentExperience,
    setCurrentLanguage,
    setCurrentSkill,
    ...data
  } = resumeState;
  const [Resume, setResume] = useState([
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
  const navigator = useNavigate()
  const getData = async () => {
    await fetch(`${baseUrl}/resume/get-resumes?user_id=${localStorage.getItem('_id')}`).then(res => res.json())
      .then(response => {
        console.log("get resume response: ", response)
        if (response.status) {
          setResume(response.results)
        }
      })
  }
  // useEffect(() => {
  //   getData()
    
  // }, [])

  const setUpdateResume = (data2) => {
    console.log("Update Resume Data: ", data2);

    setEducationInformation(data2.educationInformation);
    setExperienceInformation(data2.experienceInformation);
    setSkillInformation(data2.skills);
    setLanguageInformation(data2.languages);
    setPersonalInformation(data2.personalInformation);
    setobjectives(data2.objectives);
    setCurrentEducation({});
    setCurrentExperience({});
    setCurrentLanguage({});
    setCurrentSkill({});

    // data = data2;
  }
  useEffect(() => {
    console.log("Resume State: ----> :=> ", resumeState);
    if (localStorage.getItem('_id')) {
      getData();
    }
  }, [localStorage.getItem('_id')]);
  

  return (
    <Container sx={{ marginTop: "140px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">My Recent Resumes</Typography>
        <a href="/templates">
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
          Create New Resume
        </Button>
        </a>
      </Box>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: '1080px' }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
              padding: "50px 0px 20px 0px",
            }}
          >
            <Typography sx={tableItemStyle}>
              USER
            </Typography>
            <Typography sx={tableItemStyle}>
              MODIFICATION
            </Typography>
            <Typography sx={tableItemStyle}>
              CREATION
            </Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: "600", width: '25%', display: 'flex', justifyContent: 'flex-end' }}>
              ACTIONS
            </Typography>
          </Box>
        </Box>
       { Resume && <Box sx={{ minWidth: '1080px' }}>
          {Resume.map((item, index) => (
            <TableRow
              key={index}
              name={item.user?.fullName}
              modified={item.updated_at?.substring(0, 10)}
              created={item.created_at?.substring(0, 10)}
              onDelete={async () => {
                await fetch(`${baseUrl}/resume/delete-resume?_id=${item._id}`, { method: 'DELETE' }).then(res => res.json())
                  .then(response => {
                    console.log("delete response: ", response)
                    alert('Deleted!')
                    getData()
                  })
              }}
              onEdit={() => {
                setResume(item.text)
                setUpdateResume(item)
                // navigator(`/resume-view?_id=${item._id}`)
                navigator(`/templates/relevantResumeTemplate?_id=${item._id}`)
              }}
              onClick={() => {
                // setResume(item.text)
                setResume(item)
                setUpdateResume(item)
                // navigator(`/resume-view?view=true`)
                navigator(`/templates/relevantResumeTemplate?_id=${item._id}`)
              }}
            />
          ))}
        </Box>}
      </Box>
    </Container>
  );
};

export default ResumeDashboard;
