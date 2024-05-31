import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarker,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import baseUrl from "url";
import TemplateExperienceAndEducation from "../../../../components/TemplateExperienceAndEducation";
import TemplateSkillAndLanguage from "../../../../components/TemplateSkillsAndLanguage";
import { TemplateInfoContext } from "../../resumeState/resumeContext";
import "../index.css";
import "./index.css";
export default function CorporateResumeTemplate(props) {
  const templateState = useContext(TemplateInfoContext);
  const {
    templatesFontFamily,
    personalInformation,
    showObjectives,
    objectives,
    educationformation,
    experienceInformation,
    skillInformation,
    languageInformation,
    currentExperience,
    currentSkill,
    currentLanguage,
    currentEducation,
    ref,
  } = templateState;
  const resume = {
    backgroundColor: "white",
    boxShadow: "0px 0px 4px 0px",
    paddingTop: "1%",
    width: "auto",
  };

  return (
    <Box style={resume}>
      <Box className="corporate-resume-template-wrapper">
        <Box className="content">
          <Box className="crt-empty-grid">
            <Box className="crt-empty-grid-itm1"></Box>
          </Box>
          <Box sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            paddingRight:'30px'
          }}>
            <Typography
              fontFamily={templatesFontFamily}
              style={{ letterSpacing: "0.1em" }}
              marginLeft={"3%"}
              fontSize={"200%"}
              textTransform={"uppercase"}
            >
              {personalInformation.name}
            </Typography>
            <img style={{
                height:'120px',
                width:'120px',
                borderRadius:'50%'
            }} src={`${baseUrl}/${personalInformation.image}`} />
          </Box>
          <Box className="crt-main-grid">
            <Box className="crt-main-grid-item1">
              {/* Personal Information */}
              <Box className="crt-personal-info" marginTop={"10%"}>
                <Typography
                  fontFamily={templatesFontFamily}
                  fontSize={"80%"}
                  style={{ letterSpacing: "0.2em" }}
                  fontWeight={"600"}
                  textTransform={"uppercase"}
                >
                  contact details
                </Typography>
                {personalInformation.phone && (
                  <Box className="crt-personal-info-grid">
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="crt-personal-info-typography myClass"
                    >
                      {personalInformation.phone}
                    </Typography>
                    <Box className="crt-p-i-g-item">
                      <FontAwesomeIcon icon={faPhone} className="phone-icon" />
                    </Box>
                  </Box>
                )}
                {personalInformation.email && (
                  <Box className="crt-personal-info-grid">
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      className="crt-personal-info-typography myClass"
                    >
                      {personalInformation.email}
                    </Typography>
                    <Box className="crt-p-i-g-item">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="phone-icon"
                      />
                    </Box>
                  </Box>
                )}
                {personalInformation.address && (
                  <Box className="crt-personal-info-grid">
                    <Typography
                      className="myClass"
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      color={"rgb(0, 0, 0,0.5)"}
                      padding={"5% 5% 5% 0%"}
                      position={"relative"}
                    >
                      {personalInformation.address}
                    </Typography>
                    <Box className="crt-p-i-g-item">
                      <FontAwesomeIcon
                        icon={faMapMarker}
                        className="location-icon"
                      />
                    </Box>
                  </Box>
                )}
                {personalInformation.linkedin && (
                  <Box className="crt-personal-info-grid">
                    <Typography
                      className="myClass"
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      color={"rgb(0, 0, 0,0.5)"}
                      padding={"5% 5% 5% 0%"}
                      position={"relative"}
                    >
                      {personalInformation.linkedin}
                    </Typography>
                    <Box className="crt-p-i-g-item">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className="linked-icon"
                      />
                    </Box>
                  </Box>
                )}
                {personalInformation.github && (
                  <Box className="crt-personal-info-grid1">
                    <Typography
                      className="myClass"
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      color={"rgb(0, 0, 0,0.5)"}
                      padding={"5% 5% 5% 0%"}
                      position={"relative"}
                    >
                      {personalInformation.github}
                    </Typography>
                    <Box className="crt-p-i-g-item">
                      <FontAwesomeIcon
                        icon={faGithub}
                        className="github-icon"
                      />
                    </Box>
                  </Box>
                )}
                {personalInformation.facebook && (
                  <Box className="crt-personal-info-grid1" borderBottom={"0px"}>
                    <Typography
                      className="myClass"
                      fontFamily={templatesFontFamily}
                      fontSize={"15px"}
                      color={"rgb(0, 0, 0,0.5)"}
                      padding={"5% 5% 5% 0%"}
                      position={"relative"}
                    >
                      {personalInformation.facebook}
                    </Typography>
                    <Box className="crt-p-i-g-item">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="facebook-icon"
                      />
                    </Box>
                  </Box>
                )}
                {personalInformation.instagram && (
                  <Box className="crt-personal-info-grid1" borderBottom={"0px"}>
                    <Typography
                      className="myClass"
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      color={"rgb(0, 0, 0,0.5)"}
                      padding={"5% 5% 5% 0%"}
                      position={"relative"}
                    >
                      {personalInformation.instagram}
                    </Typography>
                    <Box className="crt-p-i-g-item">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="website-icon"
                      />
                    </Box>
                  </Box>
                )}
              </Box>
              {/* Skills */}
              <Typography
                fontFamily={templatesFontFamily}
                marginTop={"10%"}
                fontSize={"80%"}
                borderTop={"1px solid black"}
                paddingTop={"5%"}
                fontWeight={600}
              >
                SKILLS
              </Typography>
              <TemplateSkillAndLanguage
                header="Skills"
                skillInformation={skillInformation}
                currentSkill={currentSkill}
              />

              {/* Languages */}
              <Typography
                fontFamily={templatesFontFamily}
                marginTop={"10%"}
                fontSize={"70%"}
                borderTop={"1px solid black"}
                paddingTop={"5%"}
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

            {/* Right side */}
            <Box className="crt-main-grid-item2">
              <Box className="crt-main-grid-item2-spacing">
                {/* OBJECTIVES */}
                {showObjectives && (
                  <Box>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"22px"}
                      style={{ letterSpacing: "0.2em" }}
                      fontWeight={"600"}
                      textTransform={"uppercase"}
                    >
                      Objectives
                    </Typography>
                    <Typography
                      fontFamily={templatesFontFamily}
                      fontSize={"12px"}
                      textAlign={"justify"}
                      dangerouslySetInnerHTML={{ __html: objectives }}
                    ></Typography>
                  </Box>
                )}
                {/* Work Experience */}
                <TemplateExperienceAndEducation
                  header="Work experience"
                  experienceInformation={experienceInformation}
                  currentExperience={currentExperience}
                />
                {/* Education */}
                <TemplateExperienceAndEducation
                  header="Education"
                  educationformation={educationformation}
                  currentEducation={currentEducation}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
