import { Box, Typography } from '@mui/material'
import React from 'react'
import googleIcon from '../../../../../assets/icons/google.png'
import linkedinIcon from '../../../../../assets/icons/linkedin.png'
export default function Default(props) {
    return (
        <Box display={'flex'} width={'100%'} marginTop={'1%'} justifyContent={'center'}>
            <a href='https://www.gmail.com' style={{width:'49%', textDecoration:'none', color:'black'}}><Box style={{padding:'2% 0',  'border': '1px solid #00000028', 'position': 'relative', 'display': 'flex', 'marginRight': '20px', justifyContent:'center' }}>
                <img height={'60%'} width={'10%'} style={{ "margin": "3.5% 5%" }} src={googleIcon} />
                <Typography fontFamily={'Roboto'} fontSize={'15px'} paddingTop={'3%'}>{props.google}</Typography>
            </Box></a>
            <a href='https://www.linkedin.com' style={{width:'49%', textDecoration:'none', color:'black'}}><Box style={{ padding:'3% 1%', 'border': '1px solid #00000028', 'position': 'relative', 'display': 'flex', justifyContent:'center'}}>
                <img height={'80%'} width={'10%'} style={{ "margin": "2% 5%" }} src={linkedinIcon} />
                <Typography fontFamily={'Roboto'} fontSize={'15px'} paddingTop={'1.5%'}>{props.linkedin}</Typography>
            </Box></a>
        </Box>
    )
}
