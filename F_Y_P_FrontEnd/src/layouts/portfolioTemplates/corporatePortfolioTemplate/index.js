import { Box, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import CorporateResumeTemplate from "./components";
import AttractivePortfolioTemplate from "../attractivePortfolio";
import RelevantPortfolioTemplate from "../relevantPortfolioTemplate";
import CorporatePortfolio from "./components";
//import TraditionalResume from "../traditionalResume";
import PortfolioTemplateInputs from "../../../components/PortfolioTemplateInputs";
import PersuasivePortfolioTemplate from "../persuasivePortfolioTemplate";
// import html2pdf from "html2pdf.js";
import IconClose from "@mui/icons-material/Close";
import { PortfolioInfoContext } from "../portfolioState/portfolioContext";
import FlowBar from "./components/flowBar";
// import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import { ZoomIn, ZoomOut } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
// import jsPDF from "jspdf";
import axios from "axios";
import baseUrl from "../../../url";

export default function Default(props) {
  const ref = useRef(null);

  const portfolioState = useContext(PortfolioInfoContext);
  const {
    showSideCv,
    setShowSideCv,
    currentState,
    setCurrentState,
    projectInformation,
    setProjectInformation,
    personalInformation,
    objectives,
    showObjectives,
    ...data
  } = portfolioState;
  const navigator = useNavigate();
  const [zoomEffect, setZoomEffect] = useState(0.6);
  const [zoomLeftMargin, setZoomLeftMargin] = useState(0);
  const templateStyle = {
    height: "900px",
    // "width": '100%',
    position: "relative",
    marginLeft: "0%",
    marginTop: "1%",
  };

  const location = useLocation();
  const [portfolioId, setPortfolioId] = useState("");
  const savePortfolio = async (fromCopy = false) => {
    if (fromCopy) {
      const query = new URLSearchParams(location.search);

      console.log(location.pathname.split("/")[2]);
      if (query.get("_id")) {
        setPortfolioId(query.get("_id"));
        console.log("Updating Portfolio!");
        await fetch(`${baseUrl}/portfolio/update-portfolio`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updateData: {
              currentState: currentState,
              personalInformation: personalInformation,
              projectInformation: projectInformation,
              objectives: objectives,
              portfolioName: location.pathname.split("/")[2],
              updated_at: Date.now(),
            },
            _id: query.get("_id"),
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            setPortfolioId(response.result._id);
          });
      } else {
        await fetch(`${baseUrl}/portfolio/add-portfolio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolio: data,
            personalInformation: personalInformation,
            projectInformation: projectInformation,
            objectives: objectives,
            portfolioName: location.pathname.split("/")[2],
            _id: localStorage.getItem("_id"),
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            setPortfolioId(response.result._id);
            console.log(response);
          });
      }
    } else {
      const query = new URLSearchParams(location.search);

      if (query.get("_id")) {
        console.log("Updating Portfolio!");
        await fetch(`${baseUrl}/portfolio/update-portfolio`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updateData: {
              currentState: currentState,
              personalInformation: personalInformation,
              projectInformation: projectInformation,
              objectives: objectives,
              portfolioName: location.pathname.split("/")[2],
              updated_at: Date.now(),
            },
            _id: query.get("_id"),
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            if (response.status) {
              alert("Updated");
            }
            navigator("/PortfolioDashboard");
          });
      } else {
        await fetch(`${baseUrl}/portfolio/add-portfolio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolio: data,
            personalInformation: personalInformation,
            projectInformation: projectInformation,
            objectives: objectives,
            portfolioName: location.pathname.split("/")[2],
            _id: localStorage.getItem("_id"),
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            alert("Added Portfolio");
            navigator("/PortfolioDashboard");
          });
      }
    }
  };

  useEffect(() => {
    const lastSegment = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );

    if (lastSegment === "corporatePortfolioTemplate") {
      // Ensure portfolioId is set
      if (!portfolioId) {
        console.error("Portfolio ID is not set.");
        return;
      }

      const relativePath = window.location.origin;
      const link =
        relativePath + `/userPortfolio/corporatePortfolio?id=${portfolioId}`;

      console.log(link);

      // Create a temporary input element
      const tempInput = document.createElement("input");
      tempInput.value = link; // Use the modified link
      document.body.appendChild(tempInput);

      // Select the input value and copy it
      tempInput.select();
      tempInput.setSelectionRange(0, 99999);
      document.execCommand("copy");

      // Remove the temporary input element
      document.body.removeChild(tempInput);

      console.log("URL copied to clipboard:", link);
      navigator("/PortfolioDashboard");
    } else if (lastSegment === "persuasivePortfolioTemplate") {
      // Ensure portfolioId is set
      if (!portfolioId) {
        console.error("Portfolio ID is not set.");
        return;
      }

      const relativePath = window.location.origin;
      const link =
        relativePath +
        `/userPortfolio/persuasivePortfolioTemplate?id=${portfolioId}`;

      console.log(link);

      // Create a temporary input element
      const tempInput = document.createElement("input");
      tempInput.value = link; // Use the modified link
      document.body.appendChild(tempInput);

      // Select the input value and copy it
      tempInput.select();
      tempInput.setSelectionRange(0, 99999);
      document.execCommand("copy");

      // Remove the temporary input element
      document.body.removeChild(tempInput);

      console.log("URL copied to clipboard:", link);
      navigator("/PortfolioDashboard");
    } else if (lastSegment === "relevantPortfolioTemplate") {
      // Ensure portfolioId is set
      if (!portfolioId) {
        console.error("Portfolio ID is not set.");
        return;
      }

      const relativePath = window.location.origin;
      const link =
        relativePath +
        `/userPortfolio/relevantPortfolioTemplate?id=${portfolioId}`;

      console.log(link);

      // Create a temporary input element
      const tempInput = document.createElement("input");
      tempInput.value = link; // Use the modified link
      document.body.appendChild(tempInput);

      // Select the input value and copy it
      tempInput.select();
      tempInput.setSelectionRange(0, 99999);
      document.execCommand("copy");

      // Remove the temporary input element
      document.body.removeChild(tempInput);

      console.log("URL copied to clipboard:", link);
      navigator("/PortfolioDashboard");
    }
  }, [portfolioId]);

  const handleCopy = async () => {
    await savePortfolio(true);
  };

  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const translateText = async (text, targetLanguage) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("text", text);
    encodedParams.set("from", "auto");
    encodedParams.set("to", targetLanguage);

    const options = {
      method: "POST",
      url: "https://translate281.p.rapidapi.com/",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
        "X-RapidAPI-Host": "translate281.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log("response.data: ", response.data);
      return response.data.response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleTranslate = async () => {
    // Check if a language is selected
    if (!selectedLanguage) {
      // Assuming 'en' is the default language
      alert("Please select a language to translate to.");
      return;
    }

    console.log("ref: ", ref.current.innerText);

    const toTranslate = ref.current.innerText;

    try {
      const translatedText = await translateText(toTranslate, selectedLanguage);

      console.log("translatedText => ", translatedText);

      // update ref here
      ref.current.innerText = translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      alert("Failed to translate text. Please try again.");
    }
  };

  // const generatePDFf = () => {
  //     const pdf = new jsPDF();
  //     pdf.setFont('Poppins', 'normal');
  //     pdf.setFontSize(12);

  //     const leftMargin = 20;
  //     const rightMargin = 190;
  //     const lineHeight = 12;
  //     let currentY = 20;

  //     // Personal Information
  //     pdf.setFontSize(20);
  //     pdf.setFont('bold');
  //     pdf.text(leftMargin, currentY, personalInformation.name);
  //     currentY += 20;
  //     pdf.setFontSize(12);
  //     pdf.setFont('normal');
  //     pdf.text(leftMargin, currentY, `Phone: ${personalInformation.phone}`);
  //     currentY += lineHeight;
  //     pdf.text(leftMargin, currentY, `Email: ${personalInformation.email}`);
  //     currentY += lineHeight;
  //     pdf.text(leftMargin, currentY, `Address: ${personalInformation.address}`);
  //     currentY += lineHeight;
  //     pdf.line(leftMargin, currentY, rightMargin, currentY);
  //     currentY += lineHeight;

  //     // Skills Section
  //     pdf.setFontSize(16);
  //     pdf.setFont('bold');
  //     pdf.text(leftMargin, currentY, 'SKILLS');
  //     currentY += lineHeight * 2;
  //     pdf.setFontSize(12);
  //     pdf.setFont('normal');
  //     // Add skills using a loop
  //     skillInformation.forEach((skill) => {
  //         pdf.text(leftMargin, currentY, `- ${skill.skill}`);
  //         currentY += lineHeight;
  //     });

  //     // Languages Section
  //     pdf.setFontSize(16);
  //     pdf.setFont('bold');
  //     pdf.text(leftMargin, currentY, 'LANGUAGES');
  //     currentY += lineHeight * 2;
  //     pdf.setFontSize(12);
  //     pdf.setFont('normal');
  //     // Add languages using a loop
  //     languageInformation.forEach((language) => {
  //         pdf.text(leftMargin, currentY, `- ${language.language}`);
  //         currentY += lineHeight;
  //     });

  //     // Objectives Section (if visible)
  //     if (showObjectives) {
  //         pdf.setFontSize(16);
  //         pdf.setFont('bold');
  //         pdf.text(leftMargin, currentY, 'Objectives');
  //         currentY += lineHeight * 2;
  //         pdf.setFontSize(12);
  //         pdf.setFont('normal');
  //         // Add objectives text
  //         pdf.text(leftMargin, currentY, objectives);
  //         currentY += lineHeight * 6; // Adjust for the height of the objectives text
  //     }

  //     // Work Experience Section
  //     pdf.setFontSize(16);
  //     pdf.setFont('bold');
  //     pdf.text(leftMargin, currentY, 'WORK EXPERIENCE');
  //     currentY += lineHeight * 2;
  //     pdf.setFontSize(12);
  //     pdf.setFont('normal');
  //     // Add work experiences using a loop
  //     experienceInformation.forEach((experience) => {
  //         pdf.text(leftMargin, currentY, `- ${experience.jobTitle}, ${experience.company}, ${experience.dates}`);
  //         currentY += lineHeight;
  //     });

  //     // Education Sections
  //     pdf.setFontSize(16);
  //     pdf.setFont('bold');
  //     pdf.text(leftMargin, currentY, 'EDUCATION');
  //     currentY += lineHeight * 2;
  //     pdf.setFontSize(12);
  //     pdf.setFont('normal');
  //     // Add education details using a loop
  //     educationformation.forEach((education) => {
  //         pdf.text(leftMargin, currentY, `- ${education.degree}, ${education.school}, ${education.started_at}`);
  //         currentY += lineHeight;
  //     });

  //     // Save the PDF
  //     pdf.save('resume.pdf');
  // };
  const handleUndo = () => {
    if (currentState == "projects") {
      if (projectInformation.length > 0) {
        const updatedExperienceFormation = projectInformation.filter(
          (_, i) => i !== projectInformation.length - 1
        );
        setProjectInformation(updatedExperienceFormation);
      }
    }
  };
  const onSave = () => {
    savePortfolio();

    toast.success("CV saved to My Cvs Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigator("/portfolioTemplates");
  };
  const loc = useLocation();

  useEffect(() => {
    console.log("ref => ", ref);
    console.log("useEffect data: ", data);
    console.log("{(:=====-> portfolioState: ", portfolioState);
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
          <Grid item xs={12} md={12} lg={12} xl={12}>
            {/* <Box>
              <Button
                variant="contained"
                style={{ color: "white", backgroundColor: "#2a62ff" }}
                onClick={() => {
                  navigator("/portfolioTemplates");
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
            </Box> */}
            <Box>
              <PortfolioTemplateInputs
                setShowSideCv={setShowSideCv}
                currentState={currentState}
                setCurrentState={setCurrentState}
              />
            </Box>
          </Grid>

          {showSideCv ? (
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Box style={templateStyle}>
                {loc.pathname ===
                "/portfolioTemplates/corporatePortfolioTemplate" ? (
                  <Box>
                    <Box
                      sx={{
                        width: "100%", // Adjust the width as needed
                        maxWidth: "1200px", // Set the maximum width to make the box wider
                        margin: "0 auto", // Center the box
                        height: "1000px", // Set a fixed height for the box
                        overflow: "auto", // Enable scrolling
                        border: "1px solid #ccc", // Optional: Add a border for better visualization
                        padding: "16px", // Optional: Add padding
                      }}
                    >
                      <CorporatePortfolio />
                    </Box>
                  </Box>
                ) : loc.pathname ===
                  "/portfolioTemplates/attractivePortfolioTemplate" ? (
                  <Box>
                    <Box
                      sx={{
                        width: "100%", // Adjust the width as needed
                        maxWidth: "1200px", // Set the maximum width to make the box wider
                        margin: "0 auto", // Center the box
                        height: "1000px", // Set a fixed height for the box
                        overflow: "auto", // Enable scrolling
                        border: "1px solid #ccc", // Optional: Add a border for better visualization
                        padding: "16px", // Optional: Add padding
                      }}
                    >
                      <AttractivePortfolioTemplate />
                    </Box>
                  </Box>
                ) : loc.pathname ===
                  "/portfolioTemplates/relevantPortfolioTemplate" ? (
                  <Box>
                    <Box
                      sx={{
                        width: "100%", // Adjust the width as needed
                        maxWidth: "1200px", // Set the maximum width to make the box wider
                        margin: "0 auto", // Center the box
                        height: "1000px", // Set a fixed height for the box
                        overflow: "auto", // Enable scrolling
                        border: "1px solid #ccc", // Optional: Add a border for better visualization
                        padding: "16px", // Optional: Add padding
                      }}
                    >
                      <RelevantPortfolioTemplate />
                    </Box>
                  </Box>
                ) : loc.pathname ===
                  "/portfolioTemplates/persuasivePortfolioTemplate" ? (
                  <Box>
                    <Box
                      sx={{
                        width: "100%", // Adjust the width as needed
                        maxWidth: "1200px", // Set the maximum width to make the box wider
                        margin: "0 auto", // Center the box
                        height: "1000px", // Set a fixed height for the box
                        overflow: "auto", // Enable scrolling
                        border: "1px solid #ccc", // Optional: Add a border for better visualization
                        padding: "16px", // Optional: Add padding
                      }}
                    >
                      <PersuasivePortfolioTemplate />
                    </Box>
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
                        Portfolio Preview
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
                          "&:hover": {
                            backgroundColor: "#9dde8b", // Add a hover color if desired
                          },
                          borderRadius: "10px",
                          height: "80%",
                          width: "60px",
                          margin: "0px 10px 0px 10px",
                          backgroundColor: "#40a578",
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
                          "&:hover": {
                            backgroundColor: "#9dde8b", // Add a hover color if desired
                          },
                          borderRadius: "10px",
                          height: "80%",
                          width: "60px",
                          margin: "0px 10px 0px 10px",
                          backgroundColor: "#40a578",
                        }}
                        aria-label="Zoom out"
                      >
                        <ZoomOut sx={{ fill: "white" }} />
                      </IconButton>
                      <IconButton
                        onClick={handleCopy}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#9dde8b", // Add a hover color if desired
                          },
                          borderRadius: "10px",
                          height: "80%",
                          width: "150px",
                          margin: "0px 10px 0px 10px",
                          fontSize: "14px",
                          color: "white",
                          backgroundColor: "#40a578",
                        }}
                        aria-label="Zoom In"
                      >
                        Save and Copy
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
                  {loc.pathname ===
                  "/portfolioTemplates/corporatePortfolioTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        height: "20.7cm",
                        marginLeft: `${zoomLeftMargin}%`,
                        transform: `scale(${zoomEffect})`,
                      }}
                    >
                      <div ref={ref}>
                        <CorporatePortfolio />
                      </div>
                    </div>
                  ) : loc.pathname ===
                    "/portfolioTemplates/attractivePortfolioTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        transform: `scale(${zoomEffect})`,
                      }}
                      ref={ref}
                    >
                      {<AttractivePortfolioTemplate />}
                    </div>
                  ) : loc.pathname ===
                    "/portfolioTemplates/relevantPortfolioTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        transform: `scale(${zoomEffect})`,
                      }}
                      ref={ref}
                    >
                      <RelevantPortfolioTemplate />
                    </div>
                  ) : loc.pathname ===
                    "/portfolioTemplates/persuasivePortfolioTemplate" ? (
                    <div
                      style={{
                        margin: "2% 0% 0% 0%",
                        transform: `scale(${zoomEffect})`,
                      }}
                      ref={ref}
                    >
                      <PersuasivePortfolioTemplate />
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
