import React, { useContext, useRef, useState, useEffect } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CorporateResumeTemplate from "./components";
import AttractiveResumeTemplate from "../attractiveResume";
import RelevantResumeTemplate from "../relevantResumeTemplate";
import TraditionalResume from "../traditionalResume";
import PersuasiveResumeTemplate from "../persuasiveResumeTemplate";
import TemplateInputs from "../../../components/TemplateInputs";
// import html2pdf from "html2pdf.js";
import iconBack from "../../../assets/icons/iconBack.png";
import iconSave from "../../../assets/icons/downloadBlue.png";
import IconClose from "@mui/icons-material/Close";
import FlowBar from "./components/flowBar";
import ColorBar from "./components/colors";
import ButtonBar from "./components/buttonBar";
import { TemplateInfoContext } from "../resumeState/resumeContext";
// import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import generatePDF from "react-to-pdf";
import { ZoomIn, ZoomOut, Download, GTranslate } from "@mui/icons-material";
// import jsPDF from "jspdf";
import axios from "axios";
import baseUrl from "../../../url";

export default function Default(props) {
  const ref = useRef(null);

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
    templatesFontFamily,
    skillInformation,
    setSkillInformation,
    languageInformation,
    setLanguageInformation,
    personalInformation,
    setPersonalInformation,
    changeColor,
    currentlyEmployeed,
    objectives,
    showObjectives,
    setobjectives,
    ...data
  } = resumeState;
  const navigator = useNavigate();
  const [zoomEffect, setZoomEffect] = useState(0.6);
  const [zoomLeftMargin, setZoomLeftMargin] = useState(0);
  const [currentLanguage, setcurrentLanguage] = useState('en')
  const templateStyle = {
    height: "900px",
    // "width": '100%',
    position: "relative",
    marginLeft: "0%",
    marginTop: "1%",
  };

  const location = useLocation();
  const saveResume = async () => {
    const query = new URLSearchParams(location.search);
    if (query.get("_id")) {
      await fetch(`${baseUrl}/resume/update-resume`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateData: {
            templatesFontFamily: templatesFontFamily,
            changeColor: changeColor,
            currentState: currentState,
            currentlyEmployeed: currentlyEmployeed,
            personalInformation: personalInformation,
            educationInformation: educationformation,
            experienceInformation: experienceInformation,
            skillInformation: skillInformation,
            languageInformation: languageInformation,
            objectives: objectives,
            updated_at: Date.now(),
          },
          _id: query.get("_id"),
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            alert("Updated");
          }
          navigator("/ResumeDashboard");
        });
    } else {
      await fetch(`${baseUrl}/resume/add-resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: data,
          experienceInformation: experienceInformation,
          educationformation: educationformation,
          personalInformation: personalInformation,
          skillInformation: skillInformation,
          languageInformation: languageInformation,
          objectives: objectives,
          _id: localStorage.getItem("_id"),
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          alert("Added Resume");
          navigator("/ResumeDashboard");
        });
    }
  };

  const handleDownload = () => {
    setZoomEffect(1.2);

    setTimeout(() => {
      generatePDF(ref, { filename: "page.pdf" });
    }, 1000);
    toast.success("Downloading CV", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const translateText = async (text, targetLanguage) => {
    setcurrentLanguage(targetLanguage)
    Object.keys(personalInformation).map(async (key) => {
      const options = {
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
          "X-RapidAPI-Host": "google-translator9.p.rapidapi.com",
        },
        data: {
          q: personalInformation[key],
          source: currentLanguage,
          target: targetLanguage,
          format: "text",
        },
      };

      try {
        const response = await axios.request(options);
        setPersonalInformation((prevState) => {
          let newState = { ...prevState };
          newState[key] = response.data.data?.translations?.length > 0 ? response.data.data.translations[0].translatedText : '';
          return newState;
        });
        // return response.data.response;
      } catch (error) {
        console.error(error);
      }
    });
    const options = {
      method: "POST",
      url: "https://google-translator9.p.rapidapi.com/v2",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
        "X-RapidAPI-Host": "google-translator9.p.rapidapi.com",
      },
      data: {
        q: objectives,
        source: currentLanguage,
        target: targetLanguage,
        format: "text",
      },
    };

    try {
      const response = await axios.request(options);
      setobjectives(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
    educationformation.forEach(async (item, index) => {
      const translatedObject = {};
      const translationPromises = Object.keys(item).map(async (key) => {
        try {
          const response = await axios.post("https://google-translator9.p.rapidapi.com/v2", {
            q: item[key],
            source: currentLanguage,
            target: targetLanguage,
            format: "text"
          }, {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
              "X-RapidAPI-Host": "google-translator9.p.rapidapi.com"
            }
          });
          translatedObject[key] = response.data.data.translations[0].translatedText;
        } catch (error) {
          console.error(error);
          translatedObject[key] = item[key]; // Use original value if translation fails
        }
      });
      await Promise.all(translationPromises);
      setEducationInformation((prevState) => {
        const newState = [...prevState];
        newState[index] = translatedObject;
        return newState;
      });
    });
    experienceInformation.forEach(async (item, index) => {
      const translatedObject = {};
      const translationPromises = Object.keys(item).map(async (key) => {
        try {
          const response = await axios.post("https://google-translator9.p.rapidapi.com/v2", {
            q: item[key],
            source: currentLanguage,
            target: targetLanguage,
            format: "text"
          }, {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
              "X-RapidAPI-Host": "google-translator9.p.rapidapi.com"
            }
          });
          translatedObject[key] = response.data.data.translations[0].translatedText;
        } catch (error) {
          console.error(error);
          translatedObject[key] = item[key]; // Use original value if translation fails
        }
      });
      await Promise.all(translationPromises);
      setExperienceInformation((prevState) => {
        const newState = [...prevState];
        newState[index] = translatedObject;
        return newState;
      });
    });
    skillInformation.forEach(async (item, index) => {
      const translatedObject = {};
      const translationPromises = Object.keys(item).map(async (key) => {
        try {
          const response = await axios.post("https://google-translator9.p.rapidapi.com/v2", {
            q: item[key],
            source: currentLanguage,
            target: targetLanguage,
            format: "text"
          }, {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
              "X-RapidAPI-Host": "google-translator9.p.rapidapi.com"
            }
          });
          translatedObject[key] = response.data.data.translations[0].translatedText;
        } catch (error) {
          console.error(error);
          translatedObject[key] = item[key]; // Use original value if translation fails
        }
      });
      await Promise.all(translationPromises);
      setSkillInformation((prevState) => {
        const newState = [...prevState];
        newState[index] = translatedObject;
        return newState;
      });
    });
    languageInformation.forEach(async (item, index) => {
      const translatedObject = {};
      const translationPromises = Object.keys(item).map(async (key) => {
        try {
          const response = await axios.post("https://google-translator9.p.rapidapi.com/v2", {
            q: item[key],
            source: currentLanguage,
            target: targetLanguage,
            format: "text"
          }, {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
              "X-RapidAPI-Host": "google-translator9.p.rapidapi.com"
            }
          });
          translatedObject[key] = response.data.data.translations[0].translatedText;
        } catch (error) {
          console.error(error);
          translatedObject[key] = item[key]; // Use original value if translation fails
        }
      });
      await Promise.all(translationPromises);
      setLanguageInformation((prevState) => {
        const newState = [...prevState];
        newState[index] = translatedObject;
        return newState;
      });
    });
  };

  const handleTranslate = async () => {
    // Check if a language is selected
    if (!selectedLanguage) {
      // Assuming 'en' is the default language
      alert("Please select a language to translate to.");
      return;
    }
    const toTranslate = ref.current.innerText;

    try {
      if(selectedLanguage != currentLanguage){
        await translateText(toTranslate, selectedLanguage);
      }
      // update ref here
      // ref.current.innerText = translatedText;
    } catch (error) {
      alert("Failed to translate text. Please try again.");
    }
  };
  const handleUndo = () => {
    if (currentState == "education") {
      if (educationformation.length > 0) {
        const updatedExperienceFormation = educationformation.filter(
          (_, i) => i !== educationformation.length - 1
        );
        setEducationInformation(updatedExperienceFormation);
      }
    } else if (currentState == "experience") {
      if (experienceInformation.length > 0) {
        const updatedExperienceFormation = experienceInformation.filter(
          (_, i) => i !== experienceInformation.length - 1
        );
        setExperienceInformation(updatedExperienceFormation);
      }
    } else if (currentState == "skill") {
      if (skillInformation.length > 0) {
        const updatedExperienceFormation = skillInformation.filter(
          (_, i) => i !== skillInformation.length - 1
        );
        setSkillInformation(updatedExperienceFormation);
      }
    } else if (currentState == "language") {
      if (languageInformation.length > 0) {
        const updatedExperienceFormation = languageInformation.filter(
          (_, i) => i !== languageInformation.length - 1
        );
      }
    }
  };
  const onSave = () => {
    saveResume();

    toast.success("CV saved to My Cvs Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigator("/templates");
  };
  const loc = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    if (query.get("_id")) {
    }
  });

  return (
    <>
      {/* <DashboardNavbar /> */}
      <Container className="mt-28">
        <FlowBar />
        <Grid
          container
          columnSpacing={15}
          className={`${showSideCv ? "resumes-grid" : ""}`}
        >
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Box marginTop={"12%"}>
              <Button
                variant="contained"
                style={{ color: "white", backgroundColor: "#40A578" }}
                onClick={() => {
                  navigator("/templates");
                }}
              >
                Change Template
              </Button>
              <Button
                style={{ height: "50px", width: "55px", marginLeft: "0px" }}
                onClick={() => {
                  handleUndo();
                }}
              >
                <img src={iconBack} height={"100%"} width={"100%"} />
              </Button>
              <Button
                style={{ height: "50px", width: "55px", marginLeft: "-10px" }}
                onClick={onSave}
              >
                <img src={iconSave} height={"100%"} width={"100%"} />
              </Button>
            </Box>
            <Box marginTop={"18%"}>
              <TemplateInputs
                setShowSideCv={setShowSideCv}
                currentState={currentState}
                setCurrentState={setCurrentState}
              />
            </Box>
          </Grid>
          {showSideCv ? (
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Box style={templateStyle}>
                {loc.pathname === "/templates/corporateResumeTemplate" ? (
                  <Box>
                    <Box marginBottom={"3%"} marginTop={"8%"}>
                      <Grid container spacing={2}>
                        <Grid item sx={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <ColorBar />
                        </Grid>
                        <Grid
                          item
                          sx={12}
                          sm={12}
                          md={6}
                          lg={6}
                          xl={6}
                          xxl={6}
                          align="right"
                        >
                          <ButtonBar />
                        </Grid>
                      </Grid>
                    </Box>
                    <CorporateResumeTemplate />
                  </Box>
                ) : loc.pathname === "/templates/attractiveResumeTemplate" ? (
                  <Box marginBottom={"3%"} marginTop={"8%"}>
                    <Box display={"flex"}>
                      <ColorBar />
                      <ButtonBar />
                    </Box>
                    <AttractiveResumeTemplate />
                  </Box>
                ) : loc.pathname === "/templates/relevantResumeTemplate" ? (
                  <Box marginBottom={"3%"} marginTop={"8%"}>
                    <Box display={"flex"}>
                      <ColorBar />
                      <ButtonBar />
                    </Box>
                    <RelevantResumeTemplate />
                  </Box>
                ) : loc.pathname === "/templates/traditionalResumeTemplate" ? (
                  <Box marginBottom={"3%"} marginTop={"8%"}>
                    <Box display={"flex"}>
                      <ColorBar />
                      <ButtonBar />
                    </Box>
                    <TraditionalResume />
                  </Box>
                ) : loc.pathname === "/templates/persuasiveResumeTemplate" ? (
                  <Box marginBottom={"3%"} marginTop={"8%"}>
                    <Box display={"flex"}>
                      <ColorBar />
                      <ButtonBar />
                    </Box>
                    <PersuasiveResumeTemplate />
                  </Box>
                ) : (
                  <Box></Box>
                )}
              </Box>
            </Grid>
          ) : (
            <div className="overlay">
              <Box
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 10000,
                  height: "95%",
                  width: "50%",
                  overflow: "auto",
                  backgroundColor: "white",
                }}
              >
                <Box position={"sticky"} top={"0"} left={"0"} zIndex={"111"}>
                  <Box
                    style={{
                      height: "10%",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0% 2% 0% 5%",
                      marginBottom: "1%",
                      borderBottom: "1px solid black",
                      backgroundColor: "white",
                    }}
                  >
                    <Box>
                      <Typography paddingTop={"10%"} fontWeight={"700"}>
                        CV Preview
                      </Typography>
                    </Box>
                    <Box display={"flex"} sx={{ paddingTop: "10px" }}>
                      <IconButton
                        className="icon-btn"
                        onClick={() => {
                          setZoomEffect(zoomEffect + 0.1);
                          setZoomLeftMargin(zoomLeftMargin + 2);
                        }}
                        sx={{
                          backgroundColor: "#2a62ff",
                          "&:hover": {
                            backgroundColor: "#2a62ff", // Add a hover color if desired
                          },
                          borderRadius: "10px",
                          height: "80%",
                          width: "60px",
                          margin: "0px 10px 0px 10px",
                        }}
                        aria-label="Zoom In"
                      >
                        <ZoomIn sx={{ fill: "white" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setZoomEffect(zoomEffect - 0.1);
                          setZoomLeftMargin(zoomLeftMargin - 2);
                        }}
                        sx={{
                          backgroundColor: "#2a62ff",
                          "&:hover": {
                            backgroundColor: "#2a62ff", // Add a hover color if desired
                          },
                          borderRadius: "10px",
                          height: "80%",
                          width: "60px",
                          margin: "0px 10px 0px 10px",
                        }}
                        aria-label="Zoom out"
                      >
                        <ZoomOut sx={{ fill: "white" }} />
                      </IconButton>
                      <IconButton
                        onClick={handleDownload}
                        sx={{
                          backgroundColor: "#2a62ff",
                          "&:hover": {
                            backgroundColor: "#2a62ff", // Add a hover color if desired
                          },
                          borderRadius: "10px",
                          height: "80%",
                          width: "60px",
                          margin: "0px 10px 0px 10px",
                        }}
                        aria-label="Zoom In"
                      >
                        <Download sx={{ fill: "white" }} />
                      </IconButton>

                      <select
                        id="language-select"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                      >
                        <option value="en">English</option>
                        <option value="zh-CN">Chinese</option>
                        <option value="ru">Russian</option>
                        <option value="fr">French</option>
                        <option value="ar">Arabic</option>
                        <option value="es">Spanish</option>
                      </select>

                      <IconButton
                        onClick={handleTranslate}
                        sx={{
                          backgroundColor: "#2a62ff",
                          "&:hover": {
                            backgroundColor: "#2a62ff", // Add a hover color if desired
                          },
                          borderRadius: "10px",
                          height: "80%",
                          width: "60px",
                          margin: "0px 10px 0px 10px",
                        }}
                        aria-label="Zoom In"
                      >
                        <GTranslate sx={{ fill: "white" }} />
                      </IconButton>

                      <Typography
                        style={{
                          margin: "0% 3% 3% 3%",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setShowSideCv(true);
                        }}
                      >
                        <IconClose />
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  {loc.pathname === "/templates/corporateResumeTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        height: "20.7cm",
                        marginLeft: `${zoomLeftMargin}%`,
                        transform: `scale(${zoomEffect})`,
                      }}
                    >
                      <div ref={ref}>
                        <CorporateResumeTemplate />
                      </div>
                    </div>
                  ) : loc.pathname === "/templates/attractiveResumeTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        transform: `scale(${zoomEffect})`,
                      }}
                      ref={ref}
                    >
                      <AttractiveResumeTemplate />
                    </div>
                  ) : loc.pathname === "/templates/relevantResumeTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        transform: `scale(${zoomEffect})`,
                      }}
                      ref={ref}
                    >
                      <RelevantResumeTemplate />
                    </div>
                  ) : loc.pathname ===
                    "/templates/traditionalResumeTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        transform: `scale(${zoomEffect})`,
                      }}
                      ref={ref}
                    >
                      <TraditionalResume />
                    </div>
                  ) : loc.pathname === "/templates/persuasiveResumeTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        transform: `scale(${zoomEffect})`,
                      }}
                      ref={ref}
                    >
                      <PersuasiveResumeTemplate />
                    </div>
                  ) : (
                    <Box></Box>
                  )}
                </Box>
              </Box>
            </div>
          )}
        </Grid>
      </Container>
    </>
  );
}
