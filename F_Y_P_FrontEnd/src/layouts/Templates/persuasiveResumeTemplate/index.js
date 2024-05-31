import React, { useContext } from 'react'
import './index.css'
import '../index.css'
import { Box, Typography } from '@mui/material'
import { TemplateInfoContext } from '../resumeState/resumeContext'
import TemplateSkillAndLanguage from '../../../components/TemplateSkillsAndLanguage'
export default function TraditionalResume() {
    const templateState = useContext(TemplateInfoContext);
    const { templatesFontFamily, personalInformation, objectives, educationformation, experienceInformation, skillInformation, 
        languageInformation, changeColor, currentExperience, currentSkill, currentLanguage, currentEducation,showObjectives } = templateState
    const color = 'white'
    const prt_personal_info = {
        position: 'relative',
        margin: '1% 2%',
        backgroundColor: changeColor,
        color: color,
        padding: '2% 2%',
        display: 'grid',
        gridTemplateColumns: '60% 40%'
    }
    return (
        <div>
            <Box className='resume'>
                {/* Personal Information */}
                <Box>
                    <Box style={prt_personal_info}>
                        <Box marginLeft={'5%'}>
                            <Typography fontFamily={templatesFontFamily} fontSize={'2rem'}>{personalInformation.name}</Typography>
                            {showObjectives&&<Typography fontFamily={templatesFontFamily} marginTop={'1%'} fontSize={'14px'} paddingRight={'1%'} dangerouslySetInnerHTML={{ __html: objectives }}></Typography>}
                        </Box>
                        <Box className='prt-personal-info-item2' paddingLeft={'4%'} style={{ overflowWrap: 'break-word' }}>
                            { personalInformation.email && 
                                <>
                                    <Typography fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'} textAlign={'center'} fontWeight={600}>Email: </Typography>
                                    <Typography className='myClass' fontFamily={templatesFontFamily} display={'inline'} overflow={'auto'} fontSize={'15px'} paddingLeft={'25px'}>{personalInformation.email}</Typography>
                                    <br />
                                </>
                            }
                            { personalInformation.address && 
                                <>
                                    <Typography fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'} textAlign={'center'} fontWeight={600}>Address: </Typography>
                                    <Typography className='myClass' fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'} textAlign={'justify'}>{personalInformation.address}</Typography>
                                    <br />
                                </>
                            }
                            { personalInformation.phone && 
                                <>
                                    <Typography fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'} textAlign={'center'} fontWeight={600}>Phone: </Typography>
                                    <Typography className='myClass' fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'}>{personalInformation.phone}</Typography>
                                    <br />
                                </>
                            }
                            {personalInformation.linkedin && 
                                <>
                                    <Typography fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'} textAlign={'center'} fontWeight={600}>LinkedIn: </Typography>
                                    <Typography className='myClass' fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'}>{personalInformation.linkedin}</Typography>
                                    <br />
                                </>
                            }
                            { personalInformation.github && 
                                <>
                                    <Typography fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'} textAlign={'center'} fontWeight={600}>GitHub: </Typography>
                                    <Typography className='myClass' fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'}>{personalInformation.github}</Typography>
                                    <br />
                                </>
                            }
                            { personalInformation.facebook && 
                                <>
                                    <Typography fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'} textAlign={'center'} fontWeight={600}>Facebook: </Typography>
                                    <Typography className='myClass' fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'}>{personalInformation.facebook}</Typography>
                                    <br />
                                </>
                            }
                            { personalInformation.instagram && 
                                <>
                                    <Typography fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'} textAlign={'center'} fontWeight={600}>Instagram: </Typography>
                                    <Typography className='myClass' fontFamily={templatesFontFamily} display={'inline'} fontSize={'15px'}>{personalInformation.instagram}</Typography>
                                    <br />
                                </>
                            }
                        </Box>
                    </Box>
                </Box>
                {/* CAREER PATH */}
                <Box className='prt-career-path'>
                    <Typography margin={'2% 0 2% 0'}>Career Path</Typography>
                    <Box>
                        <Box className='prt-career-path-grid'>
                            {experienceInformation.map((career, index) => <Box key={index} className='prt-career-path-subgrid'>
                                <Box textAlign={'center'}>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'15px'} color={changeColor}>{career.title}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{career.location}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{career.started_from} / {career.ended_at}</Typography>
                                </Box>
                                <Box borderLeft={'1px solid black'} position={'relative'} paddingBottom={'3%'}>
                                    <Box className='prt-border-circle1'><Box className='prt-border-circle'></Box></Box>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} marginLeft={'5%'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: career.description }}></Typography>
                                </Box>
                            </Box>)}
                            {(currentExperience.title != '' || currentExperience.location != '' || currentExperience.started_from != ''
                                || currentExperience.ended_at != '' || currentExperience.description != '') && <Box className='prt-career-path-subgrid'>
                                    <Box textAlign={'center'}>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'15px'} color={changeColor}>{currentExperience.title}</Typography>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentExperience.location}</Typography>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentExperience.started_from} / {currentExperience.ended_at}</Typography>
                                    </Box>
                                    <Box borderLeft={'1px solid black'} position={'relative'} paddingBottom={'3%'}>
                                        <Box className='prt-border-circle1'><Box className='prt-border-circle'></Box></Box>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'} marginLeft={'5%'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: currentExperience.description }}></Typography>
                                    </Box>
                                </Box>}
                        </Box>
                    </Box>
                </Box>
                {/* EDUCATION */}
                <Box className='prt-career-path'>
                    <Typography margin={'2% 0 2% 0'}>Education</Typography>
                    <Box>
                        <Box className='prt-career-path-grid'>
                            {educationformation.map((career, index) => <Box key={index} className='prt-career-path-subgrid'>
                                <Box textAlign={'center'}>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'15px'} color={changeColor}>{career.title}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{career.institute}</Typography>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{career.started_from} / {career.ended_at}</Typography>
                                </Box>
                                <Box borderLeft={'1px solid black'} position={'relative'} paddingBottom={'3%'}>
                                    <Box className='prt-border-circle1'><Box className='prt-border-circle'></Box></Box>
                                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} marginLeft={'5%'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: career.description }}></Typography>
                                </Box>
                            </Box>)}
                            {(currentEducation.title != '' || currentEducation.institute != '' || currentEducation.started_from != ''
                                || currentEducation.ended_at != '' || currentEducation.description != '') && <Box className='prt-career-path-subgrid'>
                                    <Box textAlign={'center'}>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'15px'} color={changeColor}>{currentEducation.title}</Typography>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentEducation.institute}</Typography>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{currentEducation.started_from} / {currentEducation.ended_at}</Typography>
                                    </Box>
                                    <Box borderLeft={'1px solid black'} position={'relative'} paddingBottom={'3%'}>
                                        <Box className='prt-border-circle1'><Box className='prt-border-circle'></Box></Box>
                                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'} marginLeft={'5%'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: currentEducation.description }}></Typography>
                                    </Box>
                                </Box>}
                        </Box>
                    </Box>
                </Box>
                {/* SKILLS AND LANGUAGES */}
                <Box className='prt-skills-and-languages'>
                    <Box>
                        <Typography fontFamily={templatesFontFamily} marginBottom={'2%'} marginTop={'2%'} fontSize={'15px'}>Skills</Typography>
                        <TemplateSkillAndLanguage skillInformation={skillInformation} currentSkill={currentSkill} />
                    </Box>
                    <Box borderLeft={'1px solid black'} paddingLeft={'3%'}>
                        <Typography fontFamily={templatesFontFamily} fontSize={'15px'} marginTop={'2%'} marginBottom={'2%'}>Languages</Typography>
                        <TemplateSkillAndLanguage languageInformation={languageInformation} currentLanguage={currentLanguage} />
                    </Box>
                </Box>
            </Box>
        </div>


    )
};