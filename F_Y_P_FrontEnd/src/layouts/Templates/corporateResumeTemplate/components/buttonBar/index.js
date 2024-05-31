import { Box, Typography } from '@mui/material'
import { TemplateInfoContext } from '../../../../../layouts/Templates/resumeState/resumeContext'
import React, { useContext, useState } from 'react'

export default function Default() {
    const [btnsColor, setBtnsColor] = useState({
        "btn1": "#9DDE8B",
        "btn2": "#40A578",
        "btn3": "#9DDE8B",
    })
    // const [btnsRightColor, setBtnsRightColor] = useState({
    //     "btn1": "#2a62ff",
    //     "btn2": "#2a62ff",
    // })
    const templateState = useContext(TemplateInfoContext);
    const { setShowSideCv, setTemplatesFontFamily } = templateState
    return (
        <>
            <Box display={"flex"} marginLeft={'4%'} marginBottom={'2%'} width={'100%'} height={'35px'}>
                <Box display={"flex"} sx={{
                    width: {
                        sm: '55%',
                        xs: '55%',
                        md: '50%',
                        lg: '50%'
                    }
                }}>
                    <Typography onClick={() => {
                        setBtnsColor({
                            "btn1": "#40A578",
                            "btn2": "#9DDE8B",
                            "btn3": "#9DDE8B",
                        })
                        setTemplatesFontFamily('Roboto')
                    }} style={{
                        "backgroundColor": btnsColor.btn1,
                        "color": "white",
                        "padding": "5px 10px 0px 10px",
                        borderRadius: '6px',
                        marginLeft: '6px',
                        cursor: 'pointer'
                    }} backgroundColor={btnsColor.btn1}>Aa</Typography>
                    <Typography onClick={() => {
                        setBtnsColor({
                            "btn1": "#9DDE8B",
                            "btn2": "#40A578",
                            "btn3": "#9DDE8B",
                        })
                        setTemplatesFontFamily('Poppins')
                    }}
                        style={{
                            "backgroundColor": btnsColor.btn2,
                            "color": "white",
                            "padding": "5px 10px 0px 10px",
                            borderRadius: '6px',
                            marginLeft: '6px',
                            cursor: 'pointer'
                        }} backgroundColor={btnsColor.btn2}>Aa</Typography>
                    <Typography onClick={() => {
                        setBtnsColor({
                            "btn1": "#9DDE8B",
                            "btn2": "#9DDE8B",
                            "btn3": "#40A578",
                        })
                        setTemplatesFontFamily('Arial')
                    }}
                        style={{
                            "backgroundColor": btnsColor.btn3,
                            "color": "white",
                            "padding": "5px 10px 0px 10px",
                            borderRadius: '6px',
                            marginLeft: '6px',
                            cursor: 'pointer'
                        }} backgroundColor={btnsColor.btn3}>Aa</Typography>
                    <Typography onClick={() => {
                        setShowSideCv(false)
                    }}
                        style={{
                            "backgroundColor": '#40A578',
                            "color": "white",
                            "padding": "6px 10px 6px 10px",
                            borderRadius: '6px',
                            marginLeft: '20px',
                            cursor: 'pointer'
                        }}>Preview</Typography>
                </Box>
                {/* <Box style={{
                    marginLeft: '3%'
                }}>
                    <Typography onClick={() => {
                        setShowSideCv(false)
                    }}
                        style={{
                            "backgroundColor": btnsColor.btn3,
                            "color": "white",
                            "padding": "6px 10px 6px 10px",
                            borderRadius: '6px',
                            marginLeft: '6px',
                            cursor: 'pointer'
                        }}>Preview</Typography>
                </Box> */}

            </Box>
        </>
    )
}
