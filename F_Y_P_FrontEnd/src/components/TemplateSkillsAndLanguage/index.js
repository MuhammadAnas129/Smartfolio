import { Box } from '@mui/material'
import React, { useContext } from 'react'
import './index.css'
import { TemplateInfoContext } from '../../layouts/Templates/resumeState/resumeContext'
export default function Default(props) {
    const resumeState = useContext(TemplateInfoContext)
    const { templatesFontFamily } = resumeState
    return (
        <Box className='skill'>
            {/* <Typography marginTop={'10%'} className='skill-language-headings' fontWeight={600}>{props.header}</Typography> */}
            {props.skillInformation ? <>
                {props.skillInformation.map((skill, index) => {
                    return (index < props.skillInformation.length) && <Box key={index}>
                        <li style={{
                            fontFamily: templatesFontFamily
                        }} className='skill-li'>{skill.skill}</li>
                        <li style={{
                            fontFamily: templatesFontFamily
                        }} className='skill-li2'>{skill.level}</li>
                    </Box>
                })}
                {props.currentSkill.skill !== '' || props.currentSkill.level !== '' ? <Box>
                    <li style={{
                        fontFamily: templatesFontFamily
                    }} className='skill-li'>{props.currentSkill.skill}</li>
                    <li style={{
                        fontFamily: templatesFontFamily
                    }} className='skill-li2'>{props.currentSkill.level}</li>
                </Box> : <></>}
            </> : <>
                {props.languageInformation.map((language, index) => <Box key={index} sx={{margin:'0', padding:0}}>
                    <li style={{
                        fontFamily: templatesFontFamily
                    }} className='skill-li'>{language.language}</li>
                    <li style={{
                        fontFamily: templatesFontFamily
                    }} className='skill-li2'>{language.fluency}</li><br />
                </Box>)}
                {props.currentLanguage.language !== '' || props.currentLanguage.fluency !== '' ? <Box>
                    <li style={{
                        fontFamily: templatesFontFamily
                    }} className='skill-li'>{props.currentLanguage.language}</li>
                    <li style={{
                        fontFamily: templatesFontFamily
                    }} className='skill-li2'>{props.currentLanguage.fluency}</li>
                </Box> : <></>}
            </>}
        </Box>
    )
}
