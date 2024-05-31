import { TextareaAutosize, Button } from "@mui/material";
import { Box } from '@mui/system';
// import appContext from 'appState/appContext'
import appContext from '../../appState/appContext'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import baseUrl from '../../url';
import iconSave from "../../assets/icons/downloadBlue.png";
import { toast } from "react-toastify";
// import generatePDF from "react-to-pdf";
import html2pdf from "html3pdf";

export default function Default() {
    const appState = useContext(appContext);
    const { letter, setLetter } = appState;
    const navigator = useNavigate()
    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const saveLetter = async () => {
        if (query.get('_id')) {
            await fetch(`${baseUrl}/cover-letter/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: letter,
                    _id: query.get('_id')
                })
            }).then(res => res.json())
                .then(response => {
                    console.log(response)
                    if(response.status){
                        alert('Updated')
                    }
                    navigator('/LetterDashboard')
                })
        }
        else {
            await fetch(`${baseUrl}/cover-letter/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: letter,
                    _id: localStorage.getItem('_id')
                })
            }).then(res => res.json())
                .then(response => {
                    console.log(response)
                    navigator('/LetterDashboard')
                })
        }
    }
    const handleDownload = () => {
        // setTimeout(() => {
        // generatePDF(letter, { filename: "page.pdf" });
        // }, 1000);
        html2pdf()
            .from(letter)
            .set({ format: 'a4', margin: [10, 10, 10, 10], dpi: 5000 })
            .save(`cover_letter.pdf`);
        toast.success("Downloading Cover Letter", {
        position: toast.POSITION.TOP_CENTER,
        });
    };
    return (
        <Box sx={{marginTop:'150px',
        marginLeft:'100px',
        marginRight:'100px'
        }}>
            <TextareaAutosize disabled={query.get('view') || letter == 'Invalid Resume or Job description'} style={{ width: '100%' }} value={letter} onChange={(e) => {
                setLetter(e.target.value)
            }}>

            </TextareaAutosize>
           {letter != 'Invalid Resume or Job description' && <>
            {!query.get('view') &&
                <>
                    <Button sx={{
                        backgroundColor:'#40A578',
                        '&:hover':{
                            backgroundColor:'#40A578',
                        }
                    }} variant='contained' onClick={saveLetter}>Save Letter</Button>
                
                </>
            }
            <>
                <Button
                    style={{ height: "50px", width: "55px", marginLeft: "0px" }}
                    onClick={handleDownload}
                    >
                    <img src={iconSave} height={"100%"} width={"100%"} alt="icon"/>
                </Button>
            </>
                    </>}
        </Box>
    )
}
