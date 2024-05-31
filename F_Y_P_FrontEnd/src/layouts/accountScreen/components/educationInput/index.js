import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import DraggableEducationBox from './dndEducation';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import "react-datepicker/dist/react-datepicker.css";
import 'react-quill/dist/quill.snow.css';
export default function Default(props) {
    const { onEducationChange, setIsEducationAddLoading, educationformation,
        onEducationDescriptionChange, addMoreEducation, educationIndex, setAddMoreEducation,
        setsEducationIndex, setEducationInformation, addAnotherEducation, currentEducation,
        setRemovedEducation } = props;
    const handleAddMoreEducation = () => {
        setAddMoreEducation(true)
    }
    const removeEducationAtIndex = async (index) => {
        setRemovedEducation(prevState=>{
            let newState = [...prevState];
            newState.push(educationformation[index])
            return newState
        })
        const updatedEducationFormation = educationformation.filter(
            (_, i) => i !== index
        );

        setEducationInformation(updatedEducationFormation);
        setsEducationIndex(educationIndex - 1);
        // Depending on your logic, you may or may not need this line.
    };
    const moveEducation = (fromIndex, toIndex) => {
        // Assuming you're using an array to store the educationInformation state
        const updatedEducationInformation = [...props.educationformation];
        const [movedItem] = updatedEducationInformation.splice(fromIndex, 1);
        updatedEducationInformation.splice(toIndex, 0, movedItem);

        // Update the state with the new order
        props.setEducationInformation(updatedEducationInformation);
    };
    return (
        <Box marginTop={'10%'}>
            <Typography fontSize={'2rem'}>Education</Typography>
            <form name='education' style={{ "marginTop": "3%" }}>
                {educationformation.map((item, index) => <center><Box sx={{
                    width: {
                        sm: '100%',
                        md: '65%',
                        lg: '65%',
                    }
                }}>
                    <DraggableEducationBox
                        key={index}
                        education={item}
                        index={index}
                        moveEducation={moveEducation}
                        removeEducation={removeEducationAtIndex}
                    />
                </Box></center>)}
                {addMoreEducation && <Box>
                    <Grid container>
                        <Grid xs={0} sm={0} md={2} lg={2} item>

                        </Grid>
                        <Grid xs={12} sm={12} md={8} lg={8} item>
                            <Grid style={{ "marginTop": "3%" }} container spacing={2}>
                                <Grid xs={12} sm={12} md={6} lg={6} item><TextField style={{ "width": "100%" }} value={currentEducation.title} onChange={onEducationChange} id="education" name='title' type='text' placeholder='Degree in' /></Grid>
                                <Grid lg={6} item><TextField style={{ "width": "100%" }} value={currentEducation.institute} onChange={onEducationChange} name='institute' type='text' placeholder='Institute Name' /></Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} item>
                                    <Typography variant='h6'>Start Date</Typography>
                                    <TextField style={{ "width": "100%" }} value={currentEducation.started_from} onChange={onEducationChange} name='started_from' type='date' placeholder='Started From' />
                                </Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} item>
                                    <Typography variant='h6'>End Date</Typography>
                                    <TextField style={{ "width": "100%" }} value={currentEducation.ended_at} onChange={onEducationChange} name='ended_at' type='date' placeholder='Ended At' />
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={12} item>
                                    <ReactQuill
                                        value={currentEducation.description}
                                        onChange={onEducationDescriptionChange}
                                        placeholder="Type Description here"
                                        theme='snow'
                                        color='white'
                                        style={{ "borderRadious": "10px" }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={12} item align='center'>
                                    <center>
                                        <Button style={{ "color": "white", "backgroundColor": "#ffb400", "marginTop": "5%", "minWidth": '60px', "minHeight": '35px' }} onClick={addAnotherEducation} name="education" variant='contained'>ADD</Button>
                                    </center>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={0} sm={0} md={2} lg={2} item>

                        </Grid>
                    </Grid>
                </Box>}
                {!addMoreEducation && <Grid xs={12} sm={12} md={12} lg={12} item align='center'>
                    <center>
                        <Button style={{ "color": "white", "backgroundColor": "#ffb400", "marginTop": "5%", "minWidth": '80px', "minHeight": '35px' }} onClick={handleAddMoreEducation} name="education" variant='contained'>Add More</Button>
                    </center>
                </Grid>}
            </form >
        </Box >
    )
}





{/* <Box marginTop={'10%'}>
<Typography sx={{ fontSize: '25px', color: '#2a62ff' }} fontFamily={'Roboto'}>Education</Typography>
<form name='education' style={{ "marginTop": "3%" }}>
    {educationformation.map((education, index) => {
        if (index < props.educationIndex) {
            return <center><Box sx={{
                width: {
                    sm: '100%',
                    md: '65%',
                    lg: '65%',
                }
            }}>
                <DraggableEducationBox
                    key={index}
                    education={education}
                    index={index}
                    moveEducation={moveEducation}
                    removeEducation={removeEducationAtIndex}
                />
            </Box></center>

        }
        else {
            return addMoreEducation ? <Box key={index}>
                <Grid key={index} style={{ "marginTop": "3%" }} container spacing={2}>
                    <Grid xs={12} sm={0} md={2} lg={2} item></Grid>
                    <Grid xs={12} sm={12} md={4} lg={4} item><TextField style={{ "width": "100%" }} onChange={onEducationChange} value={education.title} id="education" name='title' type='text' placeholder='Degree in' /></Grid>
                    <Grid xs={12} sm={12} md={4} lg={4} item><TextField style={{ "width": "100%" }} onChange={onEducationChange} required value={education.institute} name='institute' type='text' placeholder='Institute Name' /></Grid>
                    <Grid xs={0} sm={0} md={2} lg={2} item></Grid>
                    <Grid xs={0} sm={0} md={2} lg={2} item></Grid>
                    <Grid xs={12} sm={12} md={4} lg={4} item><TextField style={{ "width": "100%" }} onChange={onEducationChange} required value={education.started_from} name='started_from' type='date' placeholder='Started From' /></Grid>
                    <Grid xs={12} sm={12} md={4} lg={4} item><TextField style={{ "width": "100%" }} onChange={onEducationChange} required value={education.ended_at} name='ended_at' type='date' placeholder='Ended At' /></Grid>
                    <Grid xs={0} sm={0} md={2} lg={2} item></Grid>
                    <Grid xs={0} sm={0} md={2} lg={2} item></Grid>
                    <Grid xs={12} sm={12} md={8} lg={8} item>
                        <div style={{ height: '200px', backgroundColor: 'white' }}>
                            <ReactQuill
                                value={education.description}
                                onChange={onEducationDescriptionChange}
                                placeholder="Type Description here"
                                theme='snow'
                                color='white'
                                style={{ "borderRadious": "10px", height: '150px' }}
                            />
                        </div>
                    </Grid>
                    <Grid xs={0} sm={0} md={8.5} lg={8.5} item></Grid>
                    <Grid xs={12} sm={12} md={2} lg={2} item>
                        <center>
                            <Button style={{ "color": "white", minHeight:'35px', "backgroundColor": "#ffb400", "marginTop": "5%" }} onClick={addAnotherEducation} name="education" variant='contained'>
                                {setIsEducationAddLoading ? (
                                    // If loading, show the CircularProgress component
                                    <CircularProgress size={24} style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                                ) : (
                                    // If not loading, show the "Send Code" text
                                    'ADD'
                                )}
                            </Button>
                        </center>
                    </Grid></Grid>
            </Box> : <Grid container>
                <Grid xs={0} sm={0} md={8.5} lg={8.5} item></Grid>
                <Grid xs={12} sm={12} md={2} lg={2} item>
                    <center key={index}>
                        <Button style={{ "color": "white", "backgroundColor": "#ffb400", "marginTop": "5%" }} onClick={handleAddMoreExperience} name="experience" variant='contained'>ADD MORE</Button>
                    </center>
                </Grid>
            </Grid>
        }
    }
    )}
</form>
</Box> */}