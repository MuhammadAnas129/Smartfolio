import React, { useContext } from 'react'
import './index.css'
import '../index.css'
import { Box, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import TemplateSkillAndLanguage from '../../../components/TemplateSkillsAndLanguage'
import { TemplateInfoContext } from '../resumeState/resumeContext';
export default function Default() {
    const templateState = useContext(TemplateInfoContext);
    const { templatesFontFamily, personalInformation, objectives, educationformation, experienceInformation, skillInformation,
        languageInformation, changeColor, currentExperience, currentSkill, currentLanguage, currentEducation ,showObjectives} = templateState
    const rrt_personal_info = {
        backgroundColor: changeColor,
        color: 'white'
    }
    return (
        <Box className='resume' paddingTop={0}>
            {/* PERSONAL INFORMATION */}
            <Box style={rrt_personal_info}>
                <Box>
                    <center><Typography fontFamily={templatesFontFamily} fontSize={'50px'} fontWeight={'900'} style={{ 'letterSpacing': '0.1em' }}>{personalInformation.name}</Typography></center>
                </Box>
                <Box className='rrt-personal-info-grid'>
                    {personalInformation.address && <center style={{ 'borderRight': '1px solid white' }}><FontAwesomeIcon icon={faMapMarker} /><Typography className='myClass' fontFamily={templatesFontFamily} padding='5px' fontSize={'15px'} fontWeight={'600'} style={{ 'letterSpacing': '0.1em' }}>{personalInformation.address}</Typography></center>}
                    {personalInformation.phone && <center style={{ 'borderRight': '1px solid white' }}><FontAwesomeIcon icon={faPhone} /><Typography className='myClass' fontFamily={templatesFontFamily} fontSize={'15px'} fontWeight={'600'} style={{ 'letterSpacing': '0.1em' }}>{personalInformation.phone}</Typography></center>}
                    {personalInformation.linkedin && <center style={{ 'borderRight': '1px solid white' }}><FontAwesomeIcon icon={faLinkedin} /><Typography className='myClass' fontFamily={templatesFontFamily} fontSize={'15px'} fontWeight={'600'} style={{ 'letterSpacing': '0.1em' }}>{personalInformation.linkedin}</Typography></center>}
                    {personalInformation.github && <center style={{ 'borderRight': '1px solid white' }}><FontAwesomeIcon icon={faGithub} /><Typography className='myClass' fontFamily={templatesFontFamily} fontSize={'15px'} fontWeight={'600'} style={{ 'letterSpacing': '0.1em' }}>{personalInformation.github}</Typography></center>}
                    {personalInformation.facebook && <center style={{ 'borderRight': '1px solid white' }}><FontAwesomeIcon icon={faFacebook} /><Typography className='myClass' fontFamily={templatesFontFamily} fontSize={'15px'} fontWeight={'600'} style={{ 'letterSpacing': '0.1em' }}>{personalInformation.facebook}</Typography></center>}
                    {personalInformation.instagram && <center style={{ 'borderRight': '1px solid white' }}><FontAwesomeIcon icon={faInstagram} /><Typography className='myClass' fontFamily={templatesFontFamily} fontSize={'15px'} fontWeight={'600'} style={{ 'letterSpacing': '0.1em' }}>{personalInformation.instagram}</Typography></center>}
                    {personalInformation.email && <center style={{ 'borderRight': '1px solid white' }}><FontAwesomeIcon icon={faEnvelope} /><Typography className='myClass' fontFamily={templatesFontFamily} fontSize={'15px'} fontWeight={'600'} style={{ 'letterSpacing': '0.1em' }}>{personalInformation.email}</Typography></center>}
                </Box>
            </Box>
            {/* OBJECTIVES INFORMATION */}
            {showObjectives && <Box margin={'3% 2%'} textAlign={'justify'}>
                <Typography fontFamily={templatesFontFamily} fontSize={'14px'} dangerouslySetInnerHTML={{ __html: objectives }}></Typography>
            </Box>}
            <Box className='rrt-grid'>
                {/* SKILLS INFORMATION */}
                <Box>
                    <center><Typography fontFamily={templatesFontFamily} margin={'10% 0% 10% 5%'} fontSize={'15px'} fontWeight={'700'} style={{ 'letterSpacing': '0.1em' }}
                        paddingBottom={'5%'} borderBottom={'1px solid black'}>SKILLS</Typography></center>
                    <TemplateSkillAndLanguage skillInformation={skillInformation} currentSkill={currentSkill} />
                    <Box>
                        <center><Typography fontFamily={templatesFontFamily} margin={'10% 0% 10% 5%'} fontSize={'15px'} fontWeight={'700'} style={{ 'letterSpacing': '0.1em' }}
                            padding={'5% 0% 5% 0%'} borderBottom={'1px solid black'} borderTop={'1px solid black'}>LANGUAGES</Typography></center>
                        <TemplateSkillAndLanguage languageInformation={languageInformation} currentLanguage={currentLanguage}/>
                    </Box>
                </Box>
                <Box className='rrt-grid-item1'>
                    <Box>
                        <center><Typography fontFamily={templatesFontFamily} margin={'4% 5% 5% 5%'} fontSize={'15px'} fontWeight={'700'} style={{ 'letterSpacing': '0.1em' }}
                            paddingBottom={'2%'} borderBottom={'1px solid black'}>EDUCATION</Typography></center>
                        <Box margin={'4% 5% 5% 5%'}>
                            {educationformation.map((education, index) => <Box key={index} marginTop={'5%'}>
                                <Typography fontFamily={templatesFontFamily} fontSize={'22px'} fontWeight={'600'}>{education.title}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{education.started_from} - {education.ended_at}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{education.institute}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: education.description }}></Typography>
                            </Box>)}
                            {(currentEducation.title != '' || currentEducation.institute != '' || currentEducation.started_from != ''
                                || currentEducation.ended_at != '' || currentEducation.description != '') && <Box marginTop={'5%'}>
                                <Typography fontFamily={templatesFontFamily} fontSize={'22px'} fontWeight={'600'}>{currentEducation.title}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentEducation.started_from} - {currentEducation.ended_at}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentEducation.institute}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: currentEducation.description }}></Typography>
                            </Box>}
                        </Box>
                    </Box>
                    <Box>
                        <center><Typography fontFamily={templatesFontFamily} margin={'4% 5% 5% 5%'} fontSize={'15px'} fontWeight={'700'} style={{ 'letterSpacing': '0.1em' }}
                            padding={'2% 0% 2% 0%'} borderBottom={'1px solid black'} borderTop={'1px solid black'}>WORK EXPERIENCE</Typography></center>
                        <Box margin={'4% 5% 5% 5%'}>
                            {experienceInformation.map((experience, index) => <Box key={index} marginTop={'5%'}>
                                <Typography fontFamily={templatesFontFamily} fontSize={'22px'} fontWeight={'600'}>{experience.title}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{experience.started_from} - {experience.ended_at}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{experience.location}</Typography>
                                <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: experience.description }}></Typography>
                            </Box>)}
                            {(currentExperience.title != '' || currentExperience.location != '' || currentExperience.started_from != ''
                                || currentExperience.ended_at != '' || currentExperience.description != '') && <Box marginTop={'5%'}>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'22px'} fontWeight={'600'}>{currentExperience.title}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentExperience.started_from} - {currentExperience.ended_at}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentExperience.location}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: currentExperience.description }}></Typography>
                                </Box>}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
