import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
// import equalIcon from "assets/icons/equal.png"
// import deleteIcon from "assets/icons/icon_delete.png"
import DraggableSkillBox from "../skilldnd";
import DraggableEducationBox from "../educationdnd";
// import CircularProgress from '@material-ui/core/CircularProgress';
import GlobalButton from "../../components/button";
import "./index.css";
import industriesData from "./industries1.json";

export default function Default(props) {
  const { currentSkill, addMoreSkills } = props;
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [allSkills, setAllSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // Load skills based on selected industry
  useEffect(() => {
    const industry = industriesData.industries.find(
      (industry) => industry.name === selectedIndustry
    );
    if (industry) {
      setAllSkills(industry.skills);
      let shuffledSkills = industry.skills.sort(() => 0.5 - Math.random());
      setSkills(shuffledSkills.slice(0, 8));
      // setSkills(industry.skills);
    } else {
      setSkills([]);
      setAllSkills([]);
    }

    if (skillInput) {
      const filteredSkills = allSkills
        .filter((skill) =>
          skill.toLowerCase().includes(skillInput.toLowerCase())
        )
        .slice(0, 8); // Limit to first 8 matches
      setSkills(filteredSkills);
    } else {
      let shuffledSkills = allSkills.sort(() => 0.1 - Math.random());
      setSkills(shuffledSkills.slice(0, 8));
    }
  }, [selectedIndustry, skillInput, allSkills]);

  const handleAddMoreSkills = () => {
    let shuffledSkills = allSkills.sort(() => 0.1 - Math.random());
    setSkills(shuffledSkills.slice(0, 8));
    props.setAddMoreSkills(true);
  };
  const removeSkillAtIndex = (index) => {
    const updatedSkillFormation = props.skillInformation.filter(
      (_, i) => i !== index
    );
    props.setSkillInformation(updatedSkillFormation);
    props.setsSkillIndex(props.skillIndex - 1); // Depending on your logic, you may or may not need this line.
  };
  const moveSkill = (fromIndex, toIndex) => {
    // Assuming you're using an array to store the educationInformation state
    const updatedExperienceInformation = [...props.skillInformation];
    const [movedItem] = updatedExperienceInformation.splice(fromIndex, 1);
    updatedExperienceInformation.splice(toIndex, 0, movedItem);

    // Update the state with the new order
    props.setSkillInformation(updatedExperienceInformation);
  };
  // Function to handle skill selection from suggestions
  const handleSelectSkill = (skill) => {
    setSkillInput(skill); // Reset the input field
    // setSkillSuggestions([]); // Clear suggestions
    const textField = document.getElementById("skill");
    if (textField) {
      textField.value = skill;
    } else {
    }
  };

  return (
    <>
      {props.header === "Skill" ? (
        <Box marginTop={"10%"}>
          {/* <Typography fontSize={'2rem'}>{props.header}</Typography> */}
          <Typography fontSize={"2rem"}>Name of Skill</Typography>
          <form onSubmit={props.onSubmission} name="skill">
            <FormControl fullWidth style={{ marginTop: "20px" }}>
              <InputLabel></InputLabel>
              {/* <Select
                            value={selectedIndustry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            label="Industry"
                        >
                            {industriesData.industries.map((industry, index) => (
                                <MenuItem key={index} value={industry.name}>{industry.name}</MenuItem>
                                ))}
                        </Select> */}
              <TextField
                fullWidth
                value={searchIndustry}
                onChange={(e) => setSearchIndustry(e.target.value)}
                label="Search Industry"
                placeholder="Search for an industry"
                style={{ marginBottom: "10px" }}
              />
              <Select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                label="Industry"
                fullWidth
              >
                {industriesData.industries
                  .filter((industry) =>
                    industry.name
                      .toLowerCase()
                      .includes(searchIndustry.toLowerCase())
                  )
                  .map((industry, index) => (
                    <MenuItem key={index} value={industry.name}>
                      {industry.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {/* <br /> */}
            <Typography fontSize={"2rem"}>{props.header}</Typography>
            {props.skillInformation.map((skill, index) => (
              <DraggableSkillBox
                key={index}
                skill={skill}
                index={index}
                moveSkill={moveSkill}
                removeSkillAtIndex={removeSkillAtIndex}
              />
            ))}
            {addMoreSkills && (
              <Box>
                <Grid container spacing={2} style={{ marginTop: "3%" }}>
                  <Grid xs={6} sm={6} md={6} lg={6} item>
                    {/* <TextField style={{ width: '100%' }} onChange={props.onValueChange} id='skill' name='skill' type='text' placeholder='Skill' /> */}
                    {/* <FormControl fullWidth>
                                    <InputLabel>Skill</InputLabel>
                                    <Select
                                        value={currentSkill.skill ? currentSkill.skill : ''}
                                        onChange={props.onValueChange}
                                        name='skill'
                                        label='Skill'
                                    >
                                        {skills.map((skill, index) => (
                                            <MenuItem key={index} value={skill}>{skill}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl> */}
                    <Box>
                      {/* <TextField style={{ width: '100%' }} value={skillInput} onChange={(e) => {setSkillInput(e.target.value)}} id='skill' name='skill' type='text' placeholder='Skill' /> */}
                      {/* <TextField style={{ width: '100%' }} value={skillInput} onChange={props.onValueChange} id='skill' name='skill' type='text' placeholder='Skill' /> */}
                      <TextField
                        style={{ width: "100%" }}
                        onChange={props.onValueChange}
                        id="skill"
                        name="skill"
                        type="text"
                        placeholder="Skill"
                      />
                      {/* <TextField style={{ width: '100%' }} onChange={props.onValueChange} id='skill' name='skill' type='text' placeholder='Skill' /> */}
                      {/* <Box style={{ marginTop: '10px' }}>
                                        {skills.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                label={skill}
                                                onClick={() => handleSelectSkill(skill)}
                                                style={{ margin: '5px', backgroundColor: '#e0e0e0' }}
                                            />
                                        ))}
                                    </Box> */}
                    </Box>
                  </Grid>
                  <Grid xs={6} sm={6} md={6} lg={6} item>
                    <Select
                      value={currentSkill.level ? currentSkill.level : "native"}
                      onChange={props.onValueChange}
                      name="level"
                      style={{ width: "100%" }}
                    >
                      <MenuItem value="professional">Professional</MenuItem>
                      <MenuItem value="expert">Expert</MenuItem>
                      <MenuItem value="average">Average</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12} md={12} align="center">
                    <Box>
                      <Box style={{ marginTop: "10px" }}>
                        {skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            onClick={() => handleSelectSkill(skill)}
                            style={{
                              margin: "5px",
                              backgroundColor: "#e0e0e0",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12} md={12} align="center">
                    <center>
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "#40A578",
                          marginTop: "5%",
                          minWidth: "60px",
                          minHeight: "35px",
                        }}
                        onClick={props.addAnotherSkill}
                        name="skill"
                        variant="contained"
                      >
                        ADD
                      </Button>
                    </center>
                  </Grid>
                </Grid>
              </Box>
            )}
            {!addMoreSkills && (
              <Grid item xs={12} sm={12} lg={12} md={12} align="center">
                <center>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#40A578",
                      marginTop: "5%",
                      minWidth: "60px",
                      minHeight: "35px",
                    }}
                    onClick={handleAddMoreSkills}
                    name="skill"
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
                onClick={(val) => {
                  // onSubmission(val, "later")
                  props.setCurrentState("experience");
                  props.setAddMoreSkills(false);
                }}
                name="skill"
              />
              <GlobalButton
                isloading={props.isloading}
                text="Next"
                type="submit"
              />
            </Box>
          </form>
        </Box>
      ) : (
        <Box marginTop={"10%"}>
          <Typography fontSize={"2rem"}>{props.header}</Typography>
          <form onSubmit={props.onSubmission} name="language">
            {props.skillInformation.map((skill, index) => (
              <DraggableEducationBox
                key={index}
                skill={skill}
                index={index}
                moveSkill={moveSkill}
                removeSkillAtIndex={removeSkillAtIndex}
              />
            ))}
            {addMoreSkills && (
              <Box>
                <Grid container spacing={2} style={{ marginTop: "3%" }}>
                  <Grid xs={6} sm={6} md={6} lg={6} item>
                    <TextField
                      style={{ width: "100%" }}
                      onChange={props.onValueChange}
                      id="language"
                      name="language"
                      type="text"
                      placeholder="Language"
                    />
                  </Grid>
                  <Grid xs={6} sm={6} md={6} lg={6} item>
                    <Select
                      value={
                        currentSkill.fluency ? currentSkill.fluency : "native"
                      }
                      onChange={props.onValueChange}
                      name="fluency"
                      style={{ width: "100%" }}
                    >
                      <MenuItem value="professional">Professional</MenuItem>
                      <MenuItem value="expert">Expert</MenuItem>
                      <MenuItem value="average">Average</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12} md={12} align="center">
                    <center>
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "#40A578",
                          marginTop: "5%",
                          minWidth: "60px",
                          minHeight: "35px",
                        }}  
                        onClick={props.addAnotherSkill}
                        name="skill"
                        variant="contained"
                      >
                        ADD
                      </Button>
                    </center>
                  </Grid>
                </Grid>
              </Box>
            )}
            {!addMoreSkills && (
              <Grid item xs={12} sm={12} lg={12} md={12} align="center">
                <center>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#40A578",
                      marginTop: "5%",
                      minWidth: "60px",
                      minHeight: "35px",
                    }}
                    onClick={handleAddMoreSkills}
                    name="skill"
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
                onClick={(val) => {
                  // onSubmission(val, "later")
                  props.setCurrentState("skill");
                  props.setAddMoreSkills(false);
                }}
                name="language"
              />
              <GlobalButton
                isloading={props.isloading}
                text="Next"
                type="submit"
              />
            </Box>
          </form>
        </Box>
      )}
    </>
  );
}
