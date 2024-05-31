import { Box, Button, Checkbox, Grid, TextField, Typography } from '@mui/material'
import React, { useState, useRef } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DraggableExperienceBox from '../dragAndDropExperience'
import GlobalButton from '../../components/button';
import axios from 'axios';
import './style.css';

export default function Default(props) {
    const { currentExperience, onDescriptionValueChange, onValueChange, isloading, isBackloading, setCurrentExperience,
        setCurrentState, onSubmission, experienceIndex, setsExperienceIndex, setExperienceInformation,
        setAddMoreExperience, experienceInformation, addMoreExperience, addAnotherExperience, currentlyEmployeed, setCurrentlyEmployeed } = props
    const [showData, setShowData] = useState(false)
    const handleAddMoreExperience = () => {
        setAddMoreExperience(true)
    }
    const removeExperienceAtIndex = async (index) => {
        const updatedEducationFormation = experienceInformation.filter(
            (_, i) => i !== index
        );
        setExperienceInformation(updatedEducationFormation);
    };
    const moveExperience = (fromIndex, toIndex) => {
        // Assuming you're using an array to store the educationInformation state
        const updatedExperienceInformation = [...experienceInformation];
        const [movedItem] = updatedExperienceInformation.splice(fromIndex, 1);
        updatedExperienceInformation.splice(toIndex, 0, movedItem);

        // Update the state with the new order
        setExperienceInformation(updatedExperienceInformation);
    };
    const editExperience = async (index) => {
        setCurrentExperience(experienceInformation[index])
        setExperienceInformation(prevState => {
            const newDataArray = [...prevState];
            newDataArray.splice(index,1)
            return newDataArray;
        });
        setShowData(true);
        setAddMoreExperience(true)
    }

    
    const textRef = useRef(null);
    const [corrections, setCorrections] = useState([]);

    const encodedParams = new URLSearchParams();

    const checkGrammarAndSpell = async () => {
        encodedParams.set("query", currentExperience.description);

        const options = {
            method: "POST",
            url: "https://grammar-and-spellcheck.p.rapidapi.com/grammarandspellcheck",
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'de8a6b5d1amsh227347a89ca6961p1e5142jsn3bedcbcb3fb2',
                'X-RapidAPI-Host': 'grammar-and-spellcheck.p.rapidapi.com'
            },
            data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            if (response.data.identified_mistakes.length === 0) {
                setCorrections([{ message: "Text looks fine, no corrections required." }]);
            } else {
                setCorrections(response.data.identified_mistakes);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box marginTop={'10%'}>
            <Typography fontSize={'2rem'}>Experience</Typography>
            <form onSubmit={onSubmission} name='experience' style={{ "marginTop": "3%" }}>
                {experienceInformation.map((item, index) => <DraggableExperienceBox
                    key={index}
                    experience={item}
                    index={index}
                    moveExperience={moveExperience}
                    removeExperience={removeExperienceAtIndex}
                    editEducation={editExperience}
                />)}
                {addMoreExperience && <Box>
                    <Grid style={{ "marginTop": "3%" }} container spacing={2}>
                        {showData ? <Grid xs={12} sm={12} md={6} lg={6} item><TextField style={{ "width": "100%" }} value={currentExperience.title} onChange={onValueChange} id="education" name='title' type='text' placeholder='Position' /></Grid> :
                            <Grid xs={12} sm={12} md={6} lg={6} item><TextField style={{ "width": "100%" }} onChange={onValueChange} id="education" name='title' type='text' placeholder='Position' /></Grid>}
                        {showData ? <Grid lg={6} item><TextField style={{ "width": "100%" }} value={currentExperience.location} onChange={onValueChange} name='location' type='text' placeholder='Location' /></Grid> :
                            <Grid lg={6} item><TextField style={{ "width": "100%" }} onChange={onValueChange} name='location' type='text' placeholder='Location' /></Grid>}
                        {showData ? <Grid xs={12} sm={12} md={6} lg={6} item>
                            <Typography variant='h6'>Start Date</Typography>
                            <TextField style={{ "width": "100%" }} value={currentExperience.started_from} onChange={onValueChange} name='started_from' type='date' placeholder='Started From' />
                        </Grid> : <Grid xs={12} sm={12} md={6} lg={6} item>
                            <Typography variant='h6'>Start Date</Typography>
                            <TextField style={{ "width": "100%" }} onChange={onValueChange} name='started_from' type='date' placeholder='Started From' />
                        </Grid>}
                        {!currentlyEmployeed && (showData ? (<Grid xs={12} sm={12} md={6} lg={6} item>
                            <Typography variant='h6'>End Date</Typography>
                            <TextField style={{ "width": "100%" }} value={currentExperience.ended_at} onChange={onValueChange} name='ended_at' type='date' placeholder='Ended At' />
                        </Grid>) : (<Grid xs={12} sm={12} md={6} lg={6} item>
                            <Typography variant='h6'>End Date</Typography>
                            <TextField style={{ "width": "100%" }} onChange={onValueChange} name='ended_at' type='date' placeholder='Ended At' />
                        </Grid>))}
                        {currentlyEmployeed ? <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box style={{ "display": "flex" }}>
                                <Checkbox onClick={() => { setCurrentlyEmployeed(!currentlyEmployeed);
                                    setCurrentExperience({...currentExperience, 'ended_at':''})
                                }} defaultChecked /> <Typography padding={'10px 0px'}>Currently Employeed</Typography>
                            </Box></Grid> : <Grid item xs={12} sm={12} md={12} lg={12}><Box style={{ "display": "flex" }}>
                                <Checkbox onClick={() => { setCurrentlyEmployeed(!currentlyEmployeed);
                                setCurrentExperience({...currentExperience, 'ended_at':'Currently Employyed'}) }} /> <Typography padding={'10px 0px'}>Currently Employeed</Typography>
                            </Box></Grid>
                        }
                        {showData ? <Grid xs={12} sm={12} md={12} lg={12} item>
                            <ReactQuill
                                value={currentExperience.description}
                                onChange={onDescriptionValueChange}
                                placeholder="Type Description here"
                                theme='snow'
                                color='white'
                                style={{ "borderRadious": "10px" }}
                            />
                        </Grid> :
                            <Grid xs={12} sm={12} md={12} lg={12} item>
                                <ReactQuill
                                    onChange={onDescriptionValueChange}
                                    placeholder="Type Description here"
                                    theme='snow'
                                    color='white'
                                    style={{ "borderRadious": "10px" }}
                                    ref={textRef}
                                />
                            </Grid>}
                            
                            <Box>
                                <button className='grammar-check-btn' type='button' onClick={checkGrammarAndSpell}>Grammarly Check</button>
                            </Box>
                            
                            <div className='corrections'>
                                {corrections.map((correction, index) => (
                                    <p key={index}><span>*</span>{correction.message}</p>
                                ))}
                            </div>
                        <Grid xs={12} sm={12} md={12} lg={12} item align='center'>
                            <center>
                                <Button style={{ "color": "white", "backgroundColor": "#40A578", "marginTop": "5%", "minWidth": '60px', "minHeight": '35px' }} onClick={addAnotherExperience} name="education" variant='contained'>ADD</Button>
                            </center>
                        </Grid>
                    </Grid>
                </Box>}
                {!addMoreExperience && <Grid xs={12} sm={12} md={12} lg={12} item align='center'>
                    <center>
                        <Button style={{ "color": "white", "backgroundColor": "#40A578", "marginTop": "5%", "minWidth": '80px', "minHeight": '35px' }} onClick={handleAddMoreExperience} name="experience" variant='contained'>Add More</Button>
                    </center>
                </Grid>}
                <Box sx={{ marginTop: '5%', display: 'flex', justifyContent: 'space-between' }}>
                    <GlobalButton isloading={isBackloading} text='Go Back' name='education' onClick={(val) => {
                        // onSubmission(val, "later")
                        setCurrentState("education")
                        setAddMoreExperience(false)
                    }} />
                    <GlobalButton isloading={isloading} text='Next' type='submit' />

                </Box>
            </form >
        </Box >
    )
}