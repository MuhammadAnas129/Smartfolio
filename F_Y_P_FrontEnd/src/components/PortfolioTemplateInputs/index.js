import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PortfolioInfoContext } from "../../layouts/portfolioTemplates/portfolioState/portfolioContext";
//COMPONENTS
import { toast } from "react-toastify";
import baseUrl from "../../url";
import ObjectiveInput from "./components/objectiveInput";
import ProjectsInput from "./components/projectsInput";

export default function Default(props) {
  const templateState = useContext(PortfolioInfoContext);
  const {
    personalInformation,
    setPersonalInformation,
    objectives,
    setobjectives,
    projectInformation,
    setProjectInformation,
    projectIndex,
    setsProjectIndex,
    showObjectives,
    setShowObjectives,
    addMoreProject,
    setAddMoreProject,
    showData,
    setFlowBarCount,
    currentProject,
    setCurrentProject,
    addAnotherProject,
  } = templateState;
  const navigate = useNavigate();
  const [isloading, setisLoading] = useState(false);
  const onValueChange = (val) => {
    console.log("current state: ", props.currentState);
    if (props.currentState === "personal") {
      setPersonalInformation({
        ...personalInformation,
        [val.target.name]: val.target.value,
      });
    } else if (props.currentState === "projects") {
      const { name, value } = val.target;
      if (name === "image") {
        const file = val.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("image", file);

          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            console.log(base64String);
            console.log("education name =====> ", name);
            console.log("education value =====> ", value);
            setCurrentProject((prevState) => {
              return {
                ...prevState,
                [val.target.name]: base64String,
              };
            });
          };

          reader.onerror = (error) => {
            console.error("Error converting image to Base64:", error);
          };
        }
      } else {
        console.log("education name =====> ", name);
        console.log("education value =====> ", value);
        setCurrentProject((prevState) => {
          return {
            ...prevState,
            [val.target.name]: value,
          };
        });
      }
    } else if (props.currentState === "objective") {
      console.log("change");
      setobjectives(val);
    }
  };
  const onDescriptionValueChange = (val) => {
    if (props.currentState === "projects") {
      setCurrentProject((prevState) => {
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
    console.log("submitted");

    if (action) {
      setisBackloading(true);
    } else {
      setisLoading(true);
    }

    if (val.target.name.id === "objective" || val.target.name === "objective") {
      if (objectives) {
        if (action !== "later") {
          props.setCurrentState("personal");
          setFlowBarCount((prevState) => {
            let newState = prevState + 1;
            return newState;
          });
        } else {
          navigate("/portfolioTemplates");
          setisLoading(false);
        }
      } else {
        toast.error("All Fields are required", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    if (val.target.name.id === "personal" || val.target.name === "personal") {
      console.log(personalInformation);
      if (
        personalInformation.name &&
        personalInformation.email &&
        personalInformation.phone &&
        personalInformation.linkedin &&
        personalInformation.github
      ) {
        props.setCurrentState("projects");
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
      val.target.name.id === "projects" ||
      val.target.name === "projects"
    ) {
      if (projectInformation.length > 0) {
        setFlowBarCount((prevState) => {
          let newState = prevState + 1;
          return newState;
        });
        props.setShowSideCv(false);
      } else {
        toast.error("At least one project should be added", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      // props.setCurrentState('download')
    }

    setisBackloading(false);
    setisLoading(false);
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
          console.log(response);
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
        <Box marginTop={"2%"}>
          <Typography fontSize={"2rem"} style={{ textAlign: "center", color:"#40A578", fontWeight: "bold" }} >Contact Details</Typography>
          <form onSubmit={onSubmission} name="personal">
            <Grid style={{ marginTop: "3%" }} spacing={2} container>
              {!showData ? (
                <>
                 <Grid xs={12} sm={12} md={6} lg={6} item>
                  <Typography fontSize={"1.5rem"} style={{ textAlign: "end" }}>
                    Full Name:
                  </Typography>
                </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%"}}
                      onChange={onValueChange}
                      name="name"
                      type="text"
                      placeholder="Full Name"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                  <Typography fontSize={"1.5rem"} style={{ textAlign: "end" }}>
                    Email: 
                  </Typography>
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
                  <Typography fontSize={"1.5rem"} style={{ textAlign: "end" }}>
                    Phone Number:
                  </Typography>
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
                  <Grid xs={6} sm={6} md={6} lg={6} item>
                  <Typography fontSize={"1.5rem"} style={{ textAlign: "end" }}>
                    LinkedIn Profile Link:
                  </Typography>
                </Grid>
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
                 <Grid xs={12} sm={12} md={6} lg={6} item >
                  <Typography variant="h6" style={{ textAlign: "end", marginRight:"5%" }}>
                    Full Name:
                  </Typography>
                </Grid>
                  <Grid xs={6} sm={6} md={6} lg={6} item>
                    <TextField
                    variant="standard"
                      style={{ width: "40%", borderRadius: "15%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="name"
                      type="text"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                  <Typography variant="h6" style={{ textAlign: "end", marginRight:"5%" }}>
                    Email:
                  </Typography>
                </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                     variant="standard"
                      style={{ width: "40%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="email"
                      value={personalInformation.email}
                      type="email"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item >
                  <Typography variant="h6" style={{ textAlign: "end", marginRight:"5%" }}>
                    Phone Number:
                  </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                    variant="standard"
                      style={{ width: "40%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="phone"
                      value={personalInformation.phone}
                      type="number"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item >
                  <Typography variant="h6" style={{ textAlign: "end", marginRight:"5%" }}>
                    LinkedIn:
                  </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                    variant="standard"
                      style={{ width: "40%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="linkedin"
                      type="url"
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item >
                  <Typography variant="h6" style={{ textAlign: "end", marginRight:"5%" }}>
                    GitHub:
                  </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} md={6} lg={6} item>
                    <TextField
                    variant="standard"
                      style={{ width: "40%" }}
                      onChange={onValueChange}
                      id="personal"
                      name="github"
                      type="url"
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
                      backgroundColor: "#9DDE8B",
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
      ) : props.currentState === "projects" ? (
        <ProjectsInput
          onSubmission={onSubmission}
          projectInformation={projectInformation}
          projectIndex={projectIndex}
          setProjectInformation={setProjectInformation}
          setsProjectIndex={setsProjectIndex}
          onValueChange={onValueChange}
          onDescriptionValueChange={onDescriptionValueChange}
          addAnotherProject={addAnotherProject}
          setCurrentState={props.setCurrentState}
          setAddMoreProject={setAddMoreProject}
          addMoreProject={addMoreProject}
          isloading={isloading}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
      ) : (
        <Box></Box>
      )}
    </>
  );
}
