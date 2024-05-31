import React, { useContext, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TemplateInfoContext } from "../resumeState/resumeContext";
import TemplateSkillAndLanguage from "../../../components/TemplateSkillsAndLanguage/index";
import "./index.css";
import baseUrl from "url";
export default function Default() {
  const templateState = useContext(TemplateInfoContext);
  const {
    templatesFontFamily,
    personalInformation,
    objectives,
    educationformation,
    experienceInformation,
    changeColor,
    skillInformation,
    languageInformation,
    currentExperience,
    currentSkill,
    currentLanguage,
    currentEducation,
    showObjectives,
  } = templateState;
  const art_main_grid_item1 = {
    margin: "8% 0% 2% 5%",
    backgroundColor: changeColor,
    padding: "2% 0% 2% 5%",
    height: "29cm",
  };
  const art_work_education_grid_itm2 = {
    borderLeft: `1px solid ${changeColor}`,
    paddingLeft: "5%",
    textAlign: "justify",
    position: "relative",
  };
  const art_border_circle = {
    height: "15px",
    width: "15px",
    position: "absolute",
    top: "0%",
    left: "-4.5%",
    backgroundColor: changeColor,
    borderRadius: "50%",
  };
  return (
    <Box
      className="resume"
      style={{ fontFamily: templatesFontFamily }}
      paddingTop={"0"}
    >
      <Box className="corporate-resume-template-wrapper">
        <Box className="content">
          <Box className="crt-main-grid">
            <Box style={art_main_grid_item1}>
              {/* Personal Information */}
              <Box className="crt-personal-info" marginTop={"10%"}>
                <Typography
                  fontFamily={templatesFontFamily}
                  fontSize={"1rem"}
                  style={{ letterSpacing: "0em" }}
                  paddingTop={"5%"}
                  className="art-personal-info-subheading"
                  fontWeight={"600"}
                  color={"white"}
                >
                  Contact Details
                </Typography>

                {personalInformation.phone && (
                  <>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"14px"}
                      fontWeight={"600"}
                      className="art-personal-info-sub-subheading"
                    >
                      PHONE
                    </Typography>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="art-personal-info-typography myClass"
                    >
                      {personalInformation.phone}
                    </Typography>
                  </>
                )}
                {personalInformation.email && (
                  <>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"14px"}
                      fontWeight={"600"}
                      className="art-personal-info-sub-subheading"
                    >
                      EMAIL
                    </Typography>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="art-personal-info-typography myClass"
                    >
                      {personalInformation.email}
                    </Typography>
                  </>
                )}
                {personalInformation.address && (
                  <>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"14px"}
                      fontWeight={"600"}
                      className="art-personal-info-sub-subheading"
                    >
                      ADDRESS
                    </Typography>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="art-personal-info-typography myClass"
                    >
                      {personalInformation.address}
                    </Typography>
                  </>
                )}
                {personalInformation.linkedin && (
                  <>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"14px"}
                      fontWeight={"600"}
                      className="art-personal-info-sub-subheading"
                    >
                      LINKEDIN
                    </Typography>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="art-personal-info-typography myClass"
                    >
                      {personalInformation.linkedin}
                    </Typography>
                  </>
                )}
                {personalInformation.github && (
                  <>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"14px"}
                      fontWeight={"600"}
                      className="art-personal-info-sub-subheading"
                    >
                      GTIHUB
                    </Typography>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="art-personal-info-typography myClass"
                    >
                      {personalInformation.github}
                    </Typography>
                  </>
                )}
                {personalInformation.facebook && (
                  <>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"14px"}
                      fontWeight={"600"}
                      className="art-personal-info-sub-subheading"
                    >
                      FACEBOOK
                    </Typography>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="art-personal-info-typography myClass"
                    >
                      {personalInformation.facebook}
                    </Typography>
                  </>
                )}
                {personalInformation.instagram && (
                  <>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"14px"}
                      fontWeight={"600"}
                      className="art-personal-info-sub-subheading"
                    >
                      INSTAGRAM
                    </Typography>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="art-personal-info-typography myClass"
                    >
                      {personalInformation.instagram}
                    </Typography>
                  </>
                )}
              </Box>
              {/* Skills */}
              <Box className="art-skills-languages">
                <Typography
                  fontFamily={templatesFontFamily}
                  marginTop={"10%"}
                  className="art-personal-info-subheading"
                  fontWeight={600}
                >
                  SKILLS
                </Typography>
                <TemplateSkillAndLanguage
                  header="Skills"
                  skillInformation={skillInformation}
                  currentSkill={currentSkill}
                />
              </Box>

              {/* Languages */}
              <Box className="art-skills-languages">
                <Typography
                  fontFamily={templatesFontFamily}
                  marginTop={"10%"}
                  className="art-personal-info-subheading"
                  fontWeight={600}
                >
                  LANGUAGES
                </Typography>
                <TemplateSkillAndLanguage
                  header="Languages"
                  languageInformation={languageInformation}
                  currentLanguage={currentLanguage}
                />
              </Box>
            </Box>

            {/* Right side */}
            <Box className="art-main-grid-item2">
              {/* <Box>
                <center>
                  <img
                    style={{
                      height: "120px",
                      width: "120px",
                      borderRadius: "50%",
                    }}
                    src={`${baseUrl}/${personalInformation.image}`}
                  />
                </center>
              </Box> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "20px",
                  paddingBottom: "15px",
                }}
              >
                <img
                  style={{
                    height: "80px",
                    width: "80px",
                    borderRadius: "50%",
                  }}
                  src={`${baseUrl}/${personalInformation.image}`}
                />
                <Typography
                  fontFamily={templatesFontFamily}
                  style={{ letterSpacing: "0.1em" }}
                  marginLeft={"0%"}
                  paddingTop={"5%"}
                  fontSize={"1rem"}
                  textTransform={"uppercase"}
                  fontWeight={600}
                >
                  {personalInformation.name}
                </Typography>
              </Box>
              <Box className="art-main-grid-item2-spacing">
                {/* OBJECTIVES */}
                {showObjectives && (
                  <Box>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      paddingRight={"15px"}
                      textAlign={"justify"}
                      dangerouslySetInnerHTML={{ __html: objectives }}
                    ></Typography>
                  </Box>
                )}
                {/* Work Experience */}
                <Box>
                  <Typography
                    fontFamily={templatesFontFamily}
                    marginTop={"10%"}
                    className="educaton-experience-headings"
                    fontWeight={600}
                  >
                    Work experience
                  </Typography>
                  {experienceInformation.map((experience, index) => (
                    <Box
                      className="art-work-education-grid"
                      key={index}
                      marginTop={"5%"}
                    >
                      <Box>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"22px"}
                          fontWeight={"600"}
                        >
                          {experience.title}
                        </Typography>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                        >
                          {experience.location}
                        </Typography>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                        >
                          {experience.started_from} - {experience.ended_at}
                        </Typography>
                      </Box>
                      <Box style={art_work_education_grid_itm2}>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                          textAlign={"justify"}
                          dangerouslySetInnerHTML={{
                            __html: experience.description,
                          }}
                        ></Typography>
                        <Box style={art_border_circle}></Box>
                      </Box>
                    </Box>
                  ))}
                  {(currentExperience.title != "" ||
                    currentExperience.location != "" ||
                    currentExperience.started_from != "" ||
                    currentExperience.ended_at != "" ||
                    currentExperience.description != "") && (
                    <Box className="art-work-education-grid" marginTop={"5%"}>
                      <Box>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"22px"}
                          fontWeight={"600"}
                        >
                          {currentExperience.title}
                        </Typography>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                        >
                          {currentExperience.location}
                        </Typography>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                        >
                          {currentExperience.started_from} -{" "}
                          {currentExperience.ended_at}
                        </Typography>
                      </Box>
                      <Box style={art_work_education_grid_itm2}>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                          textAlign={"justify"}
                          dangerouslySetInnerHTML={{
                            __html: currentExperience.description,
                          }}
                        ></Typography>
                        <Box style={art_border_circle}></Box>
                      </Box>
                    </Box>
                  )}
                </Box>
                {/* Education */}
                <Box>
                  <Typography
                    fontFamily={templatesFontFamily}
                    marginTop={"10%"}
                    className="educaton-experience-headings"
                    fontWeight={600}
                  >
                    Education
                  </Typography>
                  {educationformation.map((experience, index) => (
                    <Box
                      className="art-work-education-grid"
                      key={index}
                      marginTop={"5%"}
                    >
                      <Box>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"22px"}
                          fontWeight={"600"}
                        >
                          {experience.title}
                        </Typography>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                        >
                          {experience.institute}
                        </Typography>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                        >
                          {experience.started_from} - {experience.ended_at}
                        </Typography>
                      </Box>
                      <Box style={art_work_education_grid_itm2}>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                          textAlign={"justify"}
                          dangerouslySetInnerHTML={{
                            __html: experience.description,
                          }}
                        ></Typography>
                        <Box style={art_border_circle}></Box>
                      </Box>
                    </Box>
                  ))}
                  {(currentEducation.title != "" ||
                    currentEducation.institute != "" ||
                    currentEducation.started_from != "" ||
                    currentEducation.ended_at != "" ||
                    currentEducation.description != "") && (
                    <Box className="art-work-education-grid" marginTop={"5%"}>
                      <Box>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"22px"}
                          fontWeight={"600"}
                        >
                          {currentEducation.title}
                        </Typography>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                        >
                          {currentEducation.institute}
                        </Typography>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                        >
                          {currentEducation.started_from} -{" "}
                          {currentEducation.ended_at}
                        </Typography>
                      </Box>
                      <Box style={art_work_education_grid_itm2}>
                        <Typography
                          fontFamily={templatesFontFamily}
                          fontSize={"12px"}
                          textAlign={"justify"}
                          dangerouslySetInnerHTML={{
                            __html: currentEducation.description,
                          }}
                        ></Typography>
                        <Box style={art_border_circle}></Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
