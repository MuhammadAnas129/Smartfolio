import { Box, Typography } from '@mui/material'
import { TemplateInfoContext } from '../../../../../layouts/Templates/resumeState/resumeContext'
import React, { useContext, useState } from 'react'

export default function Default() {
    const [btnsColor, setBtnsColor] = useState({
        "btn1": "grey",
        "btn2": "#2a62ff",
        "btn3": "grey",
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
                            "btn1": "#2a62ff",
                            "btn2": "grey",
                            "btn3": "grey",
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
                            "btn1": "grey",
                            "btn2": "#2a62ff",
                            "btn3": "grey",
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
                            "btn1": "grey",
                            "btn2": "grey",
                            "btn3": "#2a62ff",
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
                            "backgroundColor": btnsColor.btn3,
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
