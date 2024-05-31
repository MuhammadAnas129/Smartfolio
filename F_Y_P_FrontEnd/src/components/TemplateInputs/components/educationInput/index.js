import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState, useRef, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import GlobalButton from "../../components/button";
import DraggableEducationBox from "../dargAndDropEducation";
import axios from "axios";
// import baseUrl from 'url';
// import { toast } from 'react-toastify';
import "./style.css";
import { TemplateInfoContext } from "layouts/Templates/resumeState/resumeContext";

export default function Default(props) {
  const {
    currentEducation,
    onValueChange,
    onDescriptionValueChange,
    setCurrentEducation,
  } = props;
  const [showData, setShowData] = useState(false);
  const templateState = useContext(TemplateInfoContext);
  const { educationformation } = templateState;
  const handleAddMoreEducation = () => {
    props.setAddMoreEducation(!props.addMoreEducation);
  };
  const removeEducationAtIndex = async (index) => {
    const updatedEducationFormation = props.educationformation.filter(
      (_, i) => i !== index
    );
    props.setEducationInformation(updatedEducationFormation);
    props.setsEducationIndex(props.educationIndex - 1);
  };
  const moveEducation = (fromIndex, toIndex) => {
    // Assuming you're using an array to store the educationInformation state
    const updatedEducationInformation = [...props.educationformation];
    const [movedItem] = updatedEducationInformation.splice(fromIndex, 1);
    updatedEducationInformation.splice(toIndex, 0, movedItem);

    // Update the state with the new order
    props.setEducationInformation(updatedEducationInformation);
  };
  const editEducation = async (index) => {
    setCurrentEducation(props.educationformation[index]);
    props.setEducationInformation((prevState) => {
      const newDataArray = [...prevState];
      newDataArray.splice(index, 1);
      return newDataArray;
    });
    setShowData(true);
    props.setAddMoreEducation(true);
  };
  useEffect(() => {
    if (props.educationformation.length < 1) {
      props.setAddMoreEducation(true);
    } else {
      props.setAddMoreEducation(false);
    }
  }, []);

  const textRef = useRef(null);
  const [corrections, setCorrections] = useState([]);
  const encodedParams = new URLSearchParams();

  const checkGrammarAndSpell = async (index) => {

    encodedParams.set("query", currentEducation.description);

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
    <Box marginTop={"10%"}>
      <Typography fontSize={"2rem"}>Education</Typography>
      <form
        onSubmit={props.onSubmission}
        name="education"
        style={{ marginTop: "3%" }}
      >
        {props.educationformation.map((item, index) => (
          <DraggableEducationBox
            key={index}
            education={item}
            index={index}
            moveEducation={moveEducation}
            removeEducation={removeEducationAtIndex}
            editEducation={editEducation}
          />
        ))}
        {props.addMoreEducation && (
          <Box>
            <Grid style={{ marginTop: "3%" }} container spacing={2}>
              {showData ? (
                <Grid xs={12} sm={12} md={6} lg={6} item>
                  <TextField
                    style={{ width: "100%" }}
                    value={currentEducation.title}
                    onChange={onValueChange}
                    id="education"
                    name="title"
                    type="text"
                    placeholder="Degree in"
                  />
                </Grid>
              ) : (
                <Grid xs={12} sm={12} md={6} lg={6} item>
                  <TextField
                    style={{ width: "100%" }}
                    onChange={onValueChange}
                    id="education"
                    name="title"
                    type="text"
                    placeholder="Degree in"
                  />
                </Grid>
              )}
              {showData ? (
                <Grid lg={6} item>
                  <TextField
                    style={{ width: "100%" }}
                    value={currentEducation.institute}
                    onChange={onValueChange}
                    name="institute"
                    type="text"
                    placeholder="Institute Name"
                  />
                </Grid>
              ) : (
                <Grid lg={6} item>
                  <TextField
                    style={{ width: "100%" }}
                    onChange={onValueChange}
                    name="institute"
                    type="text"
                    placeholder="Institute Name"
                  />
                </Grid>
              )}
              {showData ? (
                <Grid xs={12} sm={12} md={6} lg={6} item>
                  <Typography variant="h6">Start Date</Typography>
                  <TextField
                    style={{ width: "100%" }}
                    value={currentEducation.started_from}
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
                    value={currentEducation.ended_at}
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
                <Grid xs={12} sm={12} md={12} lg={12} item>
                  <ReactQuill
                    value={currentEducation.description}
                    onChange={onDescriptionValueChange}
                    placeholder="Type Description here"
                    theme="snow"
                    color="white"
                    style={{ borderRadious: "10px" }}
                  />
                  <Box>
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
                  <ReactQuill
                    onChange={onDescriptionValueChange}
                    placeholder="Type Description here"
                    theme="snow"
                    color="white"
                    style={{ borderRadious: "10px" }}
                    ref={textRef}
                  />
                </Grid>
              )}

              <Box>
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
                      marginTop: "5%",
                      minWidth: "60px",
                      minHeight: "35px",
                    }}
                    onClick={props.addAnotherEducation}
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
        {!props.addMoreEducation && (
          <Grid xs={12} sm={12} md={12} lg={12} item align="center">
            <center>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#40A578",
                  marginTop: "5%",
                  minWidth: "80px",
                  minHeight: "35px",
                }}
                onClick={handleAddMoreEducation}
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
            onClick={(val) => {
              props.setCurrentState("personal");
              props.setAddMoreEducation(false);
            }}
          />
          <GlobalButton isloading={props.isloading} text="Next" type="submit" />
        </Box>
      </form>
    </Box>
  );
}
