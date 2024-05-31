import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import './index.css'
import { TemplateInfoContext } from '../../layouts/Templates/resumeState/resumeContext'
export default function Default(props) {
    const resumeState = useContext(TemplateInfoContext)
    const { templatesFontFamily } = resumeState
    return (
        <Box>
            <Typography fontFamily={templatesFontFamily} marginTop={'10%'} className='educaton-experience-headings' fontWeight={600}>{props.header}</Typography>
            {props.experienceInformation ? <>
                {props.experienceInformation.map((experience, index) => <><Box key={index} marginTop={'5%'}>
                    <Typography fontFamily={templatesFontFamily} fontSize={'22px'} fontWeight={'600'}>{experience.title}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{experience.started_from} - {experience.ended_at}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{experience.location}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: experience.description }}></Typography>
                </Box></>)}
                <Box marginTop={'5%'}>
                    <Typography fontFamily={templatesFontFamily} fontSize={'22px'} fontWeight={'600'}>{props.currentExperience.title}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{props.currentExperience.started_from} - {props.currentExperience.ended_at}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{props.currentExperience.location}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: props.currentExperience.description }}></Typography>
                </Box>
            </> : props.educationformation || props.currentEducation ? <>
                {props.educationformation.map((education, index) =>
                    <Box key={index} marginTop={'5%'}>
                        <Typography fontFamily={templatesFontFamily} fontSize={'22px'} fontWeight={'600'}>{education.title}</Typography>
                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{education.started_from} - {education.ended_at}</Typography>
                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{education.institute}</Typography>
                        <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: education.description }}></Typography>
                    </Box>
                )}
                <Box marginTop={'5%'}>
                    <Typography fontFamily={templatesFontFamily} fontSize={'22px'} fontWeight={'600'}>{props.currentEducation.title}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{props.currentEducation.started_from} - {props.currentEducation.ended_at}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'}>{props.currentEducation.institute}</Typography>
                    <Typography fontFamily={templatesFontFamily} fontSize={'12px'} textAlign={'justify'} dangerouslySetInnerHTML={{ __html: props.currentEducation.description }}></Typography>
                </Box>
            </> : <Box></Box>}
        </Box>
    )
}
