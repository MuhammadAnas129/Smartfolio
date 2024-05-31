import { Button } from '@mui/material'
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
const btn1 = {
    color: "white",
    backgroundColor: "#40A578",
    padding: '10px 25px',
    borderRadius: '6px',
    minWidth: '130px'
}
const btn2 = {
    color: "white",
    backgroundColor: "#40A578",
    padding: '10px 15px',
    borderRadius: '6px',
    minWidth: '130px'
}
export default function Default(props) {
    let { isloading, text, onClick, type, name } = props;
    return (
        <>
            {type === 'submit' ? <Button style={btn1} type='submit' variant='contained'>{
                isloading ? (
                    // If loading, show the CircularProgress component
                    <CircularProgress size={24} style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                ) : (
                    // If not loading, show the "Send Code" text
                    `${text}`
                )}
            </Button> : <Button style={btn2} onClick={onClick} name={name} variant='contained'>{
                isloading ? (
                    // If loading, show the CircularProgress component
                    <CircularProgress size={24} style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                ) : (
                    // If not loading, show the "Send Code" text
                    `${text}`
                )}
            </Button>}
        </>
    )
}
