import React, { useContext } from 'react'
import './index.css'
import '../index.css'
import { Box, Typography } from '@mui/material'
import { TemplateInfoContext } from '../resumeState/resumeContext'
import TemplateSkillAndLanguage from '../../../components/TemplateSkillsAndLanguage'
export default function TraditionalResume() {
    const templateState = useContext(TemplateInfoContext);
    const { templatesFontFamily, personalInformation, objectives,showObjectives, educationformation, experienceInformation, skillInformation, languageInformation,
        changeColor, currentExperience, currentSkill, currentLanguage, currentEducation } = templateState
    const headerH1 = {
        position: 'relative',
        color: changeColor,
        fontSize: '27px',
        marginTop: '10%',
        fontWeight: '600'
    }
    return (
        <div>
            <Box className='resume'>
                {/* Personal Information */}
                <Box className='personal-info'>
                    <Box className='personal-info-item2'>
                        { personalInformation.email && 
                            <Box className='persona-info-item2-grid'>
                                <Typography fontFamily={templatesFontFamily} textAlign={'center'} fontWeight={700}>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                <Typography fontFamily={templatesFontFamily}>{personalInformation.email}</Typography>
                            </Box>
                        }
                        { personalInformation.address && 
                            <Box className='persona-info-item2-grid'>
                                <Typography fontFamily={templatesFontFamily} textAlign={'center'} fontWeight={700}>Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                <Typography fontFamily={templatesFontFamily}>{personalInformation.address}</Typography>
                            </Box>
                        }
                        { personalInformation.phone && 
                            <Box className='persona-info-item2-grid'>
                                <Typography fontFamily={templatesFontFamily} textAlign={'center'} fontWeight={700}>Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                <Typography fontFamily={templatesFontFamily}>{personalInformation.phone}</Typography>
                            </Box>
                        }
                        { personalInformation.linkedin && 
                            <Box className='persona-info-item2-grid'>
                                <Typography fontFamily={templatesFontFamily} textAlign={'center'} fontWeight={700}>linkedIn:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                <Typography fontFamily={templatesFontFamily}>{personalInformation.linkedin}</Typography>
                            </Box>
                        }
                        { personalInformation.github && 
                            <Box className='persona-info-item2-grid'>
                                <Typography fontFamily={templatesFontFamily} textAlign={'center'} fontWeight={700}>GtiHub:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                <Typography fontFamily={templatesFontFamily}>{personalInformation.github}</Typography>
                            </Box>
                        }
                        { personalInformation.facebook && 
                            <Box className='persona-info-item2-grid'>
                                <Typography fontFamily={templatesFontFamily} textAlign={'center'} fontWeight={700}>Facebook:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                <Typography fontFamily={templatesFontFamily}>{personalInformation.facebook}</Typography>
                            </Box>
                        }
                        { personalInformation.instagram && 
                            <Box className='persona-info-item2-grid'>
                                <Typography fontFamily={templatesFontFamily} textAlign={'center'} fontWeight={700}>Instagram:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                                <Typography fontFamily={templatesFontFamily}>{personalInformation.instagram}</Typography>
                            </Box>
                        }
                    </Box>
                    <Box marginLeft={'20%'}>
                        <Typography fontFamily={templatesFontFamily} variant='h1' style={headerH1}>{personalInformation.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                    </Box>
                </Box>
                {/* OBJECTIVES */}
                {showObjectives&&<Box className='objectives'>
                    <Typography fontFamily={templatesFontFamily} fontSize={'15px'} marginTop={'1.3%'}>Objectives</Typography>
                    <Typography fontFamily={templatesFontFamily} marginTop={'1%'} fontSize={'12px'} dangerouslySetInnerHTML={{ __html: objectives }}></Typography>
                </Box>}

                {/* CAREER PATH */}
                <Box className='career-path'>
                    <Typography fontFamily={templatesFontFamily} fontSize={'15px'} margin={'2% 0 2% 0'}>Career Path</Typography>
                    <Box>
                        <Box className='career-path-grid'>
                            {experienceInformation.map((career, index) => <Box key={index} className='career-path-subgrid'>
                                <Box>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'15px'} color={changeColor}>{career.title}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{career.location}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{career.started_from} / {career.ended_at}</Typography>
                                </Box>
                                <Box>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: career.description }}></Typography>
                                </Box>
                            </Box>)}
                            {(currentExperience.title != '' || currentExperience.location != '' || currentExperience.started_from != ''
                                || currentExperience.ended_at != '' || currentExperience.description != '') &&<Box className='career-path-subgrid'>
                                <Box>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'15px'} color={changeColor}>{currentExperience.title}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentExperience.location}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentExperience.started_from} / {currentExperience.ended_at}</Typography>
                                </Box>
                                <Box>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: currentExperience.description }}></Typography>
                                </Box>
                            </Box>}
                        </Box>
                    </Box>
                </Box>
                {/* EDUCATION */}
                <Box className='career-path'>
                    <Typography fontFamily={templatesFontFamily} fontSize={'15px'} margin={'2% 0 2% 0'}>Education and Training</Typography>
                    <Box>
                        <Box className='career-path-grid'>
                            {educationformation.map((education, index) => <Box key={index} marginTop={'2%'} className='career-path-subgrid'>
                                <Box>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'15px'} color={changeColor}>{education.title}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{education.institute}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{education.started_from} / {education.ended_at}</Typography>
                                </Box>
                                <Box>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: education.description }}></Typography>
                                </Box>
                            </Box>)}
                            {(currentEducation.title != '' || currentEducation.institute != '' || currentEducation.started_from != ''
                                || currentEducation.ended_at != '' || currentEducation.description != '') && <Box marginTop={'2%'} className='career-path-subgrid'>
                                    <Box>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'15px'} color={changeColor}>{currentEducation.title}</Typography>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentEducation.institute}</Typography>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentEducation.started_from} / {currentEducation.ended_at}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: currentEducation.description }}></Typography>
                                    </Box>
                                </Box>}
                        </Box>
                    </Box>
                </Box>
                {/* SKILLS AND LANGUAGES */}
                <Box className='skills-and-languages'>
                    <Box borderTop={'1px dotted black'}>
                        <Typography fontFamily={templatesFontFamily} marginBottom={'2%'} marginTop={'2%'} fontSize={'15px'}>Skills</Typography>
                        <TemplateSkillAndLanguage skillInformation={skillInformation} currentSkill={currentSkill} />
                    </Box>
                    <Box marginLeft={'10%'} borderTop={'1px dotted black'}>
                        <Typography fontFamily={templatesFontFamily} fontSize={'15px'} marginTop={'2%'} marginBottom={'2%'}>Languages</Typography>
                        <TemplateSkillAndLanguage languageInformation={languageInformation} currentLanguage={currentLanguage} />
                    </Box>
                </Box>
            </Box>
        </div>


    )
};