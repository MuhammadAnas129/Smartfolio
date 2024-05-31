import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { TemplateInfoContext } from "../../layouts/Templates/resumeState/resumeContext";
import CircularProgress from "@material-ui/core/CircularProgress";
//COMPONENTS
import EducationInput from "./components/educationInput";
import ExperienceInput from "./components/experienceInput";
import SkillsInput from "./components/skillInput";
import ObjectiveInput from "./components/objectiveInput";
import ImagePlaceHolder from "../../assets/icons/image_placeholder.png";
import uploadIcon from "../../assets/icons/icon_upload.png";
import { toast } from "react-toastify";
import baseUrl from "../../url";

export default function Default(props) {
  const templateState = useContext(TemplateInfoContext);
  const {
    personalInformation,
    setPersonalInformation,
    objectives,
    setobjectives,
    educationformation,
    setEducationInformation,
    experienceInformation,
    setExperienceInformation,
    skillInformation,
    setSkillInformation,
    languageInformation,
    setLanguageInformation,
    showObjectives,
    setShowObjectives,
    skillIndex,
    setsSkillIndex,
    languageIndex,
    setsLanguageIndex,
    educationIndex,
    setsEducationIndex,
    experienceIndex,
    setsExperienceIndex,
    addMoreExperience,
    setAddMoreExperience,
    addMoreEducation,
    setAddMoreEducation,
    addMoreSkills,
    setAddMoreSkills,
    addMoreLanguages,
    setAddMoreLanguages,
    showData,
    currentlyEmployeed,
    setCurrentlyEmployeed,
    setFlowBarCount,
    currentEducation,
    setCurrentEducation,
    currentExperience,
    setCurrentExperience,
    currentSkill,
    setCurrentSkill,
    currentLanguage,
    setCurrentLanguage,
    addAnotherEducation,
    addAnotherExperience,
  } = templateState;
  const navigate = useNavigate();
  const [isloading, setisLoading] = useState(false);
  const onValueChange = (val) => {
    if (props.currentState === "personal") {
      setPersonalInformation({
        ...personalInformation,
        [val.target.name]: val.target.value,
      });
    } else if (props.currentState === "education") {
      const { name, value } = val.target;
      setCurrentEducation((prevState) => {
        return {
          ...prevState,
          [val.target.name]: value,
        };
      });
    } else if (props.currentState === "experience") {
      const { value } = val.target;
      setCurrentExperience((prevState) => {
        return {
          ...prevState,
          [val.target.name]: value,
        };
      });
    } else if (props.currentState === "skill") {
      const { name, value } = val.target;
      setCurrentSkill((prevState) => {
        return {
          ...prevState,
          [val.target.name]: value,
        };
      });
    } else if (props.currentState === "language") {
      const { name, value } = val.target;
      setCurrentLanguage((prevState) => {
        return {
          ...prevState,
          [val.target.name]: value,
        };
      });
    } else if (props.currentState === "objective") {
      setobjectives(val);
    }
  };
  const onDescriptionValueChange = (val) => {
    if (props.currentState === "education") {
      setCurrentEducation((prevState) => {
        return {
          ...prevState,
          description: val,
        };
      });
    } else if (props.currentState === "experience") {
      setCurrentExperience((prevState) => {
        return {
          ...prevState,
          description: val,
        };
      });
    }
  };
  const [isBackloading, setisBackloading] = useState(false);
  const onSubmission = async (val, action) => {
    val.preventDefault();
    if (action) {
      setisBackloading(true);
    } else {
      setisLoading(true);
    }
    if (localStorage.getItem("token")) {
      if (
        val.target.name.id === "objective" ||
        val.target.name === "objective"
      ) {
        if (objectives) {
          await fetch(`${baseUrl}objectives/add-objective`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              objective: objectives,
              user_id: localStorage.getItem("user_id"),
            }),
          })
            .then((res) => res.json())
            .then(async (response) => {
              if (response.status) {
                await fetch(`${baseUrl}resumes/update-resume`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    objective: response.results.objective_id,
                    resume_id: localStorage.getItem("resume_id"),
                  }),
                })
                  .then((res) => res.json())
                  .then((response) => {
                    if (response.status) {
                      if (action !== "later") {
                        props.setCurrentState("personal");
                        setFlowBarCount((prevState) => {
                          let newState = prevState + 1;
                          return newState;
                        });
                      } else navigate("/templates");
                    } else {
                      toast.error(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }
                  });
              } else {
                toast.error(response.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            });
        } else {
          toast.error("All Fields are required", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
      if (val.target.name.id === "personal" || val.target.name === "personal") {
        if (
          personalInformation.name &&
          personalInformation.email &&
          personalInformation.phone &&
          personalInformation.address
        ) {
          await fetch(`${baseUrl}peronsalInfo/add-persona-info`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: personalInformation.name,
              email: personalInformation.email,
              phone: personalInformation.phone,
              address: personalInformation.address,
              user_id: localStorage.getItem("user_id"),
            }),
          })
            .then((res) => res.json())
            .then(async (response) => {
              if (response.status) {
                await fetch(`${baseUrl}resumes/update-resume`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    personal_info: { ...response.results.personal_info_id },
                    resume_id: localStorage.getItem("resume_id"),
                  }),
                })
                  .then((res) => res.json())
                  .then((response) => {
                    if (response.status) {
                      if (action !== "later") {
                        props.setCurrentState("education");
                        setFlowBarCount((prevState) => {
                          let newState = prevState + 1;
                          return newState;
                        });
                      } else navigate("/templates");
                    } else {
                      toast.error(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }
                  });
              } else {
                toast.error(response.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            });
        } else {
          toast.error("All Fields are required", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else if (
        val.target.name.id === "education" ||
        val.target.name === "education"
      ) {
        if (educationformation.length > 0) {
          await fetch(`${baseUrl}education/addMultipleEducation`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              educations: educationformation,
              user_id: localStorage.getItem("user_id"),
              resume_id: localStorage.getItem("resume_id"),
            }),
          })
            .then((res) => res.json())
            .then((response) => {
              if (response.status) {
                props.setCurrentState("experience");
                setFlowBarCount((prevState) => {
                  let newState = prevState + 1;
                  return newState;
                });
                setEducationInformation(response.result);
              } else {
                toast.error(response.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            });
        } else {
          toast.error("All Fields are required", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else if (
        val.target.name.id === "experience" ||
        val.target.name === "experience"
      ) {
        if (experienceInformation.length > 0) {
          await fetch(`${baseUrl}workExperience/addMultipleExperience`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              experiences: experienceInformation,
              user_id: localStorage.getItem("user_id"),
              resume_id: localStorage.getItem("resume_id"),
            }),
          })
            .then((res) => res.json())
            .then((response) => {
              if (response.status) {
                props.setCurrentState("skill");
                setFlowBarCount((prevState) => {
                  let newState = prevState + 1;
                  return newState;
                });
                setExperienceInformation(response.result);
              } else {
                toast.error(response.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            });
        } else {
          toast.error("All Fields are required", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else if (
        val.target.name.id === "skill" ||
        val.target.name === "skill"
      ) {
        if (experienceInformation.length > 0) {
          await fetch(`${baseUrl}skills/addMultipleSkill`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              skills: skillInformation,
              user_id: localStorage.getItem("user_id"),
              resume_id: localStorage.getItem("resume_id"),
            }),
          })
            .then((res) => res.json())
            .then((response) => {
              if (response.status) {
                props.setCurrentState("language");
                setFlowBarCount((prevState) => {
                  let newState = prevState + 1;
                  return newState;
                });
                setSkillInformation(response.result);
              } else {
                toast.error(response.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            });
        } else {
          toast.error("Add atleast one", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else if (
        val.target.name.id === "language" ||
        val.target.name === "language"
      ) {
        if (experienceInformation.length > 0) {
          await fetch(`${baseUrl}languages/addMultipleLanguage`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              languages: languageInformation,
              user_id: localStorage.getItem("user_id"),
              resume_id: localStorage.getItem("resume_id"),
            }),
          })
            .then((res) => res.json())
            .then((response) => {
              if (response.status) {
                setFlowBarCount((prevState) => {
                  let newState = prevState + 1;
                  return newState;
                });
                props.setShowSideCv(false);
                setLanguageInformation(response.result);
              } else {
                toast.error(response.message, {
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            });
        } else {
          toast.error("Add atleast one", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } else {
      if (
        val.target.name.id === "objective" ||
        val.target.name === "objective"
      ) {
        if (objectives) {
          if (action !== "later") {
            props.setCurrentState("personal");
            setFlowBarCount((prevState) => {
              let newState = prevState + 1;
              return newState;
            });
          } else {
            navigate("/templates");
            setisLoading(false);
          }
        } else {
          toast.error("All Fields are required", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else if (
        val.target.name.id === "personal" ||
        val.target.name === "personal"
      ) {
        props.setCurrentState("education");
        setFlowBarCount((prevState) => {
          let newState = prevState + 1;
          return newState;
        });
      } else if (
        val.target.name.id === "education" ||
        val.target.name === "education"
      ) {
        props.setCurrentState("experience");
        setFlowBarCount((prevState) => {
          let newState = prevState + 1;
          return newState;
        });
      } else if (
        val.target.name.id === "experience" ||
        val.target.name === "experience"
      ) {
        if (
          experienceInformation[0].title &&
          experienceInformation[0].location &&
          experienceInformation[0].started_from &&
          experienceInformation[0].ended_at &&
          experienceInformation[0].description
        ) {
          props.setCurrentState("skill");
          setFlowBarCount((prevState) => {
            let newState = prevState + 1;
            return newState;
          });
        } else {
          toast.error("All Fields are required", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else if (
        val.target.name.id === "skill" ||
        val.target.name === "skill"
      ) {
        props.setCurrentState("language");
        setFlowBarCount((prevState) => {
          let newState = prevState + 1;
          return newState;
        });
      } else if (
        val.target.name.id === "language" ||
        val.target.name === "language"
      ) {
        // props.setCurrentState('download')
        setFlowBarCount((prevState) => {
          let newState = prevState + 1;
          return newState;
        });
        props.setShowSideCv(false);
      }
    }
    setisBackloading(false);
    setisLoading(false);
  };

  const addAnotherSkill = async () => {
    if (currentSkill.skill && currentSkill.level) {
      setSkillInformation((prevState) => {
        let newState = [...prevState];
        newState.push(currentSkill);
        return newState;
      });
      setCurrentSkill({
        skill: "",
        level: "",
      });
      setAddMoreSkills(false);
    } else {
      toast.error("All Fields are required", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const addAnotherLanguage = async () => {
    if (currentLanguage.language && currentLanguage.fluency) {
      setLanguageInformation((prevState) => {
        let newState = [...prevState];
        newState.push(currentLanguage);
        return newState;
      });
      setCurrentLanguage({
        language: "",
        fluency: "",
      });
      setAddMoreLanguages(false);
    } else {
      toast.error("All Fields are required", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const [previewImage, setPreviewImage] = useState("");
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", event.target.files[0]);
      await fetch(`${baseUrl}/imageUpload/upload`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setPersonalInformation({
              ...personalInformation,
              image: response.result,
            });
          }
        });
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage("");
    }
  };
  return (
    <>
      {props.currentState === "objective" ? (
        <ObjectiveInput
          showObjectives={showObjectives}
          setShowObjectives={setShowObjectives}
          onSubmission={onSubmission}
          isBackloading={isBackloading}
          objectives={objectives}
          onValueChange={onValueChange}
          isloading={isloading}
        />
      ) : props.currentState === "personal" ? (
        <Box marginTop={"10%"}>
          <Typography fontSize={"2rem"}>Contact Details</Typography>
          <form onSubmit={onSubmission} name="personal">
            <Grid style={{ marginTop: "3%" }} spacing={2} container>
              {!showData ? (
                <>
                  <Grid xs={12} sm={12} md={12} lg={12} item>
                    <center>
                      <img
                        height={"110px"}
                        width={"110px"}
                        style={{
                          borderRadius: handleImageChange ? "50%" : "0",
                        }}
                        src={`${
                          previewImage ? previewImage : ImagePlaceHolder
                        }`}
                        alt="img"
                      />
                    </center>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} item>
                    <center style={{ marginBottom: "13%" }}>
                      <label htmlFor="fileInput" className="custom-file-upload">
                        <img
                          style={{ margin: "3px 15px 0px 0px" }}
                          src={uploadIcon}
                          height={"15px"}
                          width={"20px"}
                          alt="img"
                        />
                        <Typography>Upload Your Image</Typography>
                        <input
                          onChange={handleImageChange}
                          type="file"
                          id="fileInput"
                        />
                      </label>
                    </center>
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%", borderRadius: "10px" }}
                      onChange={onValueChange}
                      id="personal"
                      name="name"
                      type="text"
                      placeholder="Full Name"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="phone"
                      type="number"
                      placeholder="Phone Number"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="address"
                      type="text"
                      placeholder="Address"
                    />
                  </Grid>{" "}
                  :
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="linkedin"
                      type="text"
                      placeholder="Linkedin"
                    />
                  </Grid>{" "}
                </>
              ) : (
                <>
                  <Grid xs={12} sm={12} md={12} lg={12} item>
                    <center>
                      <img
                        height={"110px"}
                        width={"110px"}
                        style={{
                          borderRadius: handleImageChange ? "50%" : "0",
                        }}
                        src={`${
                          previewImage ? previewImage : ImagePlaceHolder
                        }`}
                        alt="img"
                      />
                    </center>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} item>
                    
                    <center style={{ marginBottom: "13%"}}>
                      <label htmlFor="fileInput" className="custom-file-upload" >
                        <img 
                          style={{ margin: "3px 15px 0px 0px" }}
                          src={uploadIcon}
                          
                          height={"15px"}
                          width={"20px"}
                          alt="img"
                        />
                        <Typography sx={{
                          color:'white'
                          
                        }}
                        >Upload Your Image</Typography>
                        <input
                          onChange={handleImageChange}
                          type="file"
                          id="fileInput"
                        />
                      </label>
                    </center>
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%", borderRadius: "10px" }}
                      onChange={onValueChange}
                      value={personalInformation.name}
                      id="personal"
                      name="name"
                      type="text"
                      placeholder="Full Name"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="email"
                      value={personalInformation.email}
                      type="email"
                      placeholder="Email Address"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="phone"
                      value={personalInformation.phone}
                      type="number"
                      placeholder="Phone Number"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="address"
                      value={personalInformation.address}
                      type="text"
                      placeholder="Address"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="linkedin"
                      type="url"
                      placeholder="Linkedin"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="github"
                      type="url"
                      placeholder="GitHub"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="facebook"
                      type="url"
                      placeholder="Facebook"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="instagram"
                      type="url"
                      placeholder="Instagram"
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Box
              sx={{
                marginTop: "5%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#40A578",
                  padding: "8px 35px",
                  borderRadius: "6px",
                }}
                onClick={(val) => {
                  // onSubmission(val, "later")
                  props.setCurrentState("objective");
                }}
                name="personal"
                variant="contained"
              >
                Go Back
              </Button>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#40A578",
                  padding: "8px 45px",
                  borderRadius: "6px",
                  minWidth: "130px",
                }}
                type="submit"
                variant="contained"
              >
                {isloading ? (
                  // If loading, show the CircularProgress component
                  <CircularProgress
                    size={24}
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                ) : (
                  // If not loading, show the "Send Code" text
                  "Next"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      ) : props.currentState === "education" ? (
        <EducationInput
          onSubmission={onSubmission}
          educationformation={educationformation}
          educationIndex={educationIndex}
          setEducationInformation={setEducationInformation}
          setsEducationIndex={setsEducationIndex}
          onValueChange={onValueChange}
          onDescriptionValueChange={onDescriptionValueChange}
          addAnotherEducation={addAnotherEducation}
          setCurrentState={props.setCurrentState}
          setAddMoreEducation={setAddMoreEducation}
          addMoreEducation={addMoreEducation}
          isloading={isloading}
          currentEducation={currentEducation}
          setCurrentEducation={setCurrentEducation}
        />
      ) : props.currentState === "experience" ? (
        <ExperienceInput
          onSubmission={onSubmission}
          experienceInformation={experienceInformation}
          experienceIndex={experienceIndex}
          setExperienceInformation={setExperienceInformation}
          setsExperienceIndex={setsExperienceIndex}
          onValueChange={onValueChange}
          onDescriptionValueChange={onDescriptionValueChange}
          addAnotherExperience={addAnotherExperience}
          setCurrentState={props.setCurrentState}
          addMoreExperience={addMoreExperience}
          setAddMoreExperience={setAddMoreExperience}
          isloading={isloading}
          currentExperience={currentExperience}
          setCurrentExperience={setCurrentExperience}
          currentlyEmployeed={currentlyEmployeed}
          setCurrentlyEmployeed={setCurrentlyEmployeed}
        />
      ) : props.currentState === "skill" ? (
        <SkillsInput
          onSubmission={onSubmission}
          skillInformation={skillInformation}
          skillIndex={skillIndex}
          setSkillInformation={setSkillInformation}
          setsSkillIndex={setsSkillIndex}
          addAnotherSkill={addAnotherSkill}
          onValueChange={onValueChange}
          header="Skill"
          setCurrentState={props.setCurrentState}
          setAddMoreSkills={setAddMoreSkills}
          addMoreSkills={addMoreSkills}
          isloading={isloading}
          currentSkill={currentSkill}
        />
      ) : props.currentState === "language" ? (
        <SkillsInput
          onSubmission={onSubmission}
          skillInformation={languageInformation}
          skillIndex={languageIndex}
          setSkillInformation={setLanguageInformation}
          setsSkillIndex={setsLanguageIndex}
          addAnotherSkill={addAnotherLanguage}
          onValueChange={onValueChange}
          header="Language"
          setCurrentState={props.setCurrentState}
          setAddMoreSkills={setAddMoreLanguages}
          addMoreSkills={addMoreLanguages}
          isloading={isloading}
          currentSkill={currentLanguage}
        />
      ) : (
        <Box></Box>
      )}
    </>
  );
}
