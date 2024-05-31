import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import GlobalButton from "../button";
import DraggableProjectBox from "../dargAndDropProject";
import { PortfolioInfoContext } from "layouts/portfolioTemplates/portfolioState/portfolioContext";
import uploadIcon from "../../../../assets/icons/icon_upload.png";
import "./style.css";
export default function Default(props) {
  console.log("project info: ", props.projectInformation);
  const {
    currentProject,
    onValueChange,
    onDescriptionValueChange,
    setCurrentProject,
  } = props;
  const [showData, setShowData] = useState(false);
  const templateState = useContext(PortfolioInfoContext);
  const { projectInformation } = templateState;
  const handleAddMoreProject = () => {
    props.setAddMoreProject(!props.addMoreProject);
  };
  const removeEducationAtIndex = async (index) => {
    const updatedProjectInformation = props.projectInformation.filter(
      (_, i) => i !== index
    );
    props.setProjectInformation(updatedProjectInformation);
    props.setsProjectIndex(props.projectIndex - 1);
  };
  const moveEducation = (fromIndex, toIndex) => {
    // Assuming you're using an array to store the educationInformation state
    const updatedEducationInformation = [...props.projectInformation];
    const [movedItem] = updatedEducationInformation.splice(fromIndex, 1);
    updatedEducationInformation.splice(toIndex, 0, movedItem);

    // Update the state with the new order
    props.setProjectInformation(updatedEducationInformation);
  };
  const editEducation = async (index) => {
    setCurrentProject(props.projectInformation[index]);
    props.setProjectInformation((prevState) => {
      const newDataArray = [...prevState];
      newDataArray.splice(index, 1);
      return newDataArray;
    });
    setShowData(true);
    props.setAddMoreProject(true);
  };
  useEffect(() => {
    if (props.projectInformation.length < 1) {
      props.setAddMoreProject(true);
    } else {
      props.setAddMoreProject(false);
    }
  }, []);

  const textRef = useRef(null);
  const [corrections, setCorrections] = useState([]);
  const encodedParams = new URLSearchParams();

  const checkGrammarAndSpell = async (index) => {
    encodedParams.set("query", currentProject.description);

    const options = {
      method: "POST",
      url: "https://grammar-and-spellcheck.p.rapidapi.com/grammarandspellcheck",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2",
        "X-RapidAPI-Host": "grammar-and-spellcheck.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      // console.log(response.data.identified_mistakes[0].message);

      // setCorrections(response.data.identified_mistakes);
      if (response.data.identified_mistakes.length === 0) {
        setCorrections([
          { message: "Text looks fine, no corrections required." },
        ]);
      } else {
        setCorrections(response.data.identified_mistakes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography fontSize={"2rem"} style={{ textAlign: "center", color:"#40A578", fontWeight: "bold" }} >Projects</Typography>
      <form
        onSubmit={props.onSubmission}
        name="projects"
        style={{ marginTop: "3%" }}
      >
        {props.projectInformation.map((item, index) => (

          <DraggableProjectBox
            key={index}
            project={item}
            index={index}
            moveProject={moveEducation}
            removeProject={removeEducationAtIndex}
            editProject={editEducation}
          />
        ))}
        {props.addMoreProject && (
          <Box>
            <Grid style={{ marginTop: "3%" }} container spacing={2}>
              {showData ? (
                <>
                <Grid xs={12} sm={12} md={2} lg={2} item >
                <Typography variant="h6" style={{ marginRight:"5%" }}>
                Title of Project:
                </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={4} item>
                  <TextField
                  variant="standard"
                    style={{ width: "80%" }}
                    value={currentProject.title}
                    onChange={onValueChange}
                    id="project"
                    name="title"
                    type="text"
                  />
                </Grid>
                </>
              ) : (
                <>
                <Grid xs={12} sm={12} md={2} lg={2} item >
                <Typography variant="h6" style={{ marginRight:"5%" }}>
                Title of Project:
                </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={4} item>
                  <TextField
                  variant="standard"
                    style={{ width: "80%" }}
                    onChange={onValueChange}
                    id="project"
                    name="title"
                    type="text"
                  />
                </Grid>
                </>
              )}
              {showData ? (
                <>
                <Grid xs={12} sm={12} md={2} lg={2} item >
                <Typography variant="h6" style={{ marginRight:"5%" }}>
                Project Link:
                </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={4} item>
                  <TextField
                  variant="standard"
                    style={{ width: "80%" }}
                    value={currentProject.link}
                    onChange={onValueChange}
                    id="project"
                    name="link"
                    type="url"
                  />
                </Grid>
                </>
              ) : (
                <>
                <Grid xs={12} sm={12} md={2} lg={2} item >
                <Typography variant="h6" style={{ marginRight:"5%" }}>
                Project Link:
                </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={4} lg={4} item>
                  <TextField
                   variant="standard"
                    style={{ width: "80%" }}
                    value={currentProject.link}
                    onChange={onValueChange}
                    id="project"
                    name="link"
                    type="url"
                  />
                </Grid>
                </>
              )}
              {showData ? (
                <Grid xs={12} sm={12} md={6} lg={6} item>
                  <Typography variant="h6">Start Date</Typography>
                  <TextField
                    style={{ width: "100%" }}
                    value={currentProject.started_from}
                    onChange={onValueChange}
                    name="started_from"
                    type="date"
                    placeholder="Started From"
                  />
                </Grid>
              ) : (
                <Grid xs={12} sm={12} md={6} lg={6} item>
                  <Typography variant="h6">Start Date</Typography>
                  <TextField
                    style={{ width: "100%" }}
                    onChange={onValueChange}
                    name="started_from"
                    type="date"
                    placeholder="Started From"
                  />
                </Grid>
              )}
              {showData ? (
                <Grid xs={12} sm={12} md={6} lg={6} item>
                  <Typography variant="h6">End Date</Typography>
                  <TextField
                    style={{ width: "100%" }}
                    value={currentProject.ended_at}
                    onChange={onValueChange}
                    name="ended_at"
                    type="date"
                    placeholder="Ended At"
                  />
                </Grid>
              ) : (
                <Grid xs={12} sm={12} md={6} lg={6} item>
                  <Typography variant="h6">End Date</Typography>
                  <TextField
                    style={{ width: "100%" }}
                    onChange={onValueChange}
                    name="ended_at"
                    type="date"
                    placeholder="Ended At"
                  />
                </Grid>
              )}
              {showData ? (
                <>
                <Grid xs={12} sm={12} md={2} lg={2} item><></></Grid>
                <Grid xs={12} sm={12} md={8} lg={8} item>
                  <Typography variant="h6" style={{textAlign:"center"}}>Upload Image</Typography>
                  <center style={{ marginBottom: "3%" }}>
                    <label htmlFor="fileInput">
                      <img
                        style={{ margin: "3px 15px 0px 0px" }}
                        src={uploadIcon}
                        height={"15px"}
                        width={"20px"}
                        alt="img"
                      />
                      <input
                        onChange={onValueChange}
                        type="file"
                        id="fileInput"
                        name="image"
                      />
                    </label>
                  </center>
                </Grid>
                <Grid xs={12} sm={12} md={2} lg={2} item><></></Grid>
                </>
              ) : (
                <>
                <Grid xs={12} sm={12} md={2} lg={2} item></Grid>
                <Grid xs={12} sm={12} md={8} lg={8} item>
                  <Typography variant="h6" style={{textAlign:"center"}}>Upload Image</Typography>
                  <center style={{ marginBottom: "3%" }}>
                    <label htmlFor="fileInput">
                      <img
                        style={{ margin: "3px 15px 0px 0px" }}
                        src={uploadIcon}
                        height={"15px"}
                        width={"20px"}
                        alt="img"
                      />
                      <input
                        onChange={onValueChange}
                        type="file"
                        id="fileInput"
                        name="image"
                      />
                    </label>
                  </center>
                </Grid>
                <Grid xs={12} sm={12} md={2} lg={2} item><></></Grid>
                </>
              )}
              {showData ? (
                <Grid xs={12} sm={12} md={12} lg={12} item>
                    <Typography variant="h6">Project Description</Typography>
                  <ReactQuill
                    value={currentProject.description}
                    onChange={onDescriptionValueChange}
                    placeholder="Type Description here"
                    theme="snow"
                    color="white"
                    style={{ 
                      borderRadius: "10px", 
                      height: "200px",
                      color: "white" 
                      }}
                  />
                  <Box marginTop={"5%"}>
                    <button
                      className="grammar-check-btn"
                      type="button"
                      onClick={checkGrammarAndSpell}
                    >
                      Grammarly Check
                    </button>
                  </Box>

                  <div className="corrections">
                    {corrections.map((correction, index) => (
                      <p key={index}>
                        <span>*</span>
                        {correction.message}
                      </p>
                    ))}
                  </div>
                </Grid>
              ) : (
                <Grid xs={12} sm={12} md={12} lg={12} item>
                   <Typography variant="h6">Project Description</Typography>
                  <ReactQuill
                    onChange={onDescriptionValueChange}
                    placeholder="Type Description here"
                    theme="snow"
                    color="white"
                    style={{ 
                      borderRadius: "10px", 
                      height: "200px",
                      color: "white" 
                      }}
                    ref={textRef}
                  />
                </Grid>
              )}

              <Box marginTop={"5%"}>
                <button
                  className="grammar-check-btn"
                  type="button"
                  onClick={checkGrammarAndSpell}
                >
                  Grammarly Check
                </button>
              </Box>

              <div className="corrections">
                {corrections.map((correction, index) => (
                  <p key={index}>
                    <span>*</span>
                    {correction.message}
                  </p>
                ))}
              </div>
              <Grid xs={12} sm={12} md={12} lg={12} item align="center">
                <center>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#40A578",
                      minWidth: "60px",
                      minHeight: "35px",
                    }}
                    onClick={props.addAnotherProject}
                    name="education"
                    variant="contained"
                  >
                    ADD
                  </Button>
                </center>
              </Grid>
            </Grid>
          </Box>
        )}
        {!props.addMoreProject && (
          <Grid xs={12} sm={12} md={12} lg={12} item align="center">
            <center>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#40A578",
                  minWidth: "80px",
                  minHeight: "35px",
                }}
                onClick={handleAddMoreProject}
                name="education"
                variant="contained"
              >
                Add More
              </Button>
            </center>
          </Grid>
        )}
        <Box
          sx={{
            marginTop: "5%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <GlobalButton
            isloading={props.isBackloading}
            text="Go Back"
            name="education"
            style = {{
              backgroundColor : "9DDE8B",
            }}
            onClick={(val) => {
              props.setCurrentState("personal");
              props.setAddMoreProject(false);
            }}
          />
          <GlobalButton isloading={props.isloading} text="Next" type="submit" />
        </Box>
      </form>
    </Box>
  );
}
