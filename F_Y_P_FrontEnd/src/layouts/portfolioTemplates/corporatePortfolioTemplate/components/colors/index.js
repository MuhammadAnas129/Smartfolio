import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import red from "../../../../../assets/colors/red.png"
import lightRed from "../../../../../assets/colors/lightRed.png"
import yellow from "../../../../../assets/colors/yellow.png"
import mustard from "../../../../../assets/colors/mustard.png"
import green from "../../../../../assets/colors/green.png"
import blue from "../../../../../assets/colors/blue.png"
import { TemplateInfoContext } from '../../../../../layouts/Templates/resumeState/resumeContext'
import tickIcon from '../../../../../assets/colors/check.png'
export default function Default() {
    const resumeState = useContext(TemplateInfoContext);
    const { changeColor,setchangeColor } = resumeState;

    return (
        <Box height={"35px"} width={'100%'} marginRight={'0%'} display={"flex"} 
             style={{backgroundColor: '#00000012', padding:'5px 0px 5px 5px', borderRadius:'10px'}} >
            <Typography style={{ "padding": "0.5% 5%", "fontWeight": "bold" }}>Color</Typography>
            <Box position={'relative'} height={'100%'} margin={'0px 0.5%'}>
                {changeColor === '#3870B1' && <img src={tickIcon} style={{
                    "position":"absolute",
                    height:"40%",
                    zIndex:"1111",
                    top:'30%',
                    left:'25%'
                }}
                alt='img'/>}
                <img onClick={()=>{setchangeColor("#3870B1")}} height={'100%'} src={blue} style={{ "margin": "0% 1%" }} alt="img" />
            </Box>
            <Box position={'relative'} height={'100%'} margin={'0px 0.5%'}>
                {changeColor === '#C0392B' && <img src={tickIcon} style={{
                    "position":"absolute",
                    height:"40%",
                    zIndex:"1111",
                    top:'30%',
                    left:'25%'
                }}
                alt='img'/>}
                <img onClick={()=>{setchangeColor("#C0392B")}} height={'100%'} src={red} style={{ "margin": "0% 1%" }} alt="img" />
            </Box>
            <Box position={'relative'} height={'100%'} margin={'0px 0.5%'}>
                {changeColor === '#50E3C2' && <img src={tickIcon} style={{
                    "position":"absolute",
                    height:"40%",
                    zIndex:"1111",
                    top:'30%',
                    left:'25%'
                }}
                alt='img'/>}
                <img onClick={()=>{setchangeColor("#50E3C2")}} height={'100%'} src={green} style={{ "margin": "0% 1%" }} alt="img" />
            </Box>
            <Box position={'relative'} height={'100%'} margin={'0px 0.5%'}>
                {changeColor === '#FE7A66' && <img src={tickIcon} style={{
                    "position":"absolute",
                    height:"40%",
                    zIndex:"1111",
                    top:'30%',
                    left:'25%'
                }}
                alt='img'/>}
                <img onClick={()=>{setchangeColor("#FE7A66")}} height={'100%'} src={lightRed} style={{ "margin": "0% 1%" }} alt="img" />
            </Box>
            <Box position={'relative'} height={'100%'} margin={'0px 0.5%'}>
                {changeColor === '#E9A507' && <img src={tickIcon} style={{
                    "position":"absolute",
                    height:"40%",
                    zIndex:"1111",
                    top:'30%',
                    left:'25%'
                }}
                alt='img'/>}
                <img onClick={()=>{setchangeColor("#E9A507")}} height={'100%'} src={yellow} style={{ "margin": "0% 1%" }} alt="img" />
            </Box>
            <Box position={'relative'} height={'100%'} margin={'0px 0.5%'}>
                {changeColor === '#BCA97E' && <img src={tickIcon} style={{
                    "position":"absolute",
                    height:"40%",
                    zIndex:"1111",
                    top:'30%',
                    left:'25%'
                }}
                alt='img'/>}
                <img onClick={()=>{setchangeColor("#BCA97E")}} height={'100%'} src={mustard} style={{ "margin": "0% 1%" }} alt="img" />
            </Box>
        </Box>
    )
}
