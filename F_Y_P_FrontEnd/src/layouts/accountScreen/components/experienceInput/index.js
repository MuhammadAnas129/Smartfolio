import { Grid, Typography, TextField, Button, Box } from '@mui/material';
import DraggableExperienceBox from './dndExperience';
import React from 'react'
import ReactQuill from 'react-quill'
// import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-quill/dist/quill.snow.css';
// import baseUrl from 'url';
// import { toast } from 'react-toastify';
export default function Default(props) {
    const { experienceInformation, isExperienceAddLoading, onExperienceChange, setExperienceInformation,
        setsExperienceIndex, setAddMoreExperience, onExperienceDescriptionChange, experienceIndex,
        addMoreExperience, addAnotherExperience, currentExperience ,setRemovedExperience } = props;
    const handleAddMoreExperience = () => {
        setAddMoreExperience(true)
    }
    const removeExperienceAtIndex = async (index) => {
        setRemovedExperience(prevState=>{
            let newState = [...prevState];
            newState.push(experienceInformation[index])
            return newState
        })
        const updatedExperienceFormation = experienceInformation.filter(
            (_, i) => i !== index
        );
        setExperienceInformation(updatedExperienceFormation);
        setsExperienceIndex(experienceIndex - 1)
    };
    const moveExperience = (fromIndex, toIndex) => {
        // Assuming you're using an array to store the educationInformation state
        const updatedExperienceInformation = [...experienceInformation];
        const [movedItem] = updatedExperienceInformation.splice(fromIndex, 1);
        updatedExperienceInformation.splice(toIndex, 0, movedItem);

        // Update the state with the new order
        setExperienceInformation(updatedExperienceInformation);
    };
    return (
        <Box marginTop={'10%'}>
            <Typography fontSize={'2rem'}>Experience</Typography>
            <form name='education' style={{ "marginTop": "3%" }}>
                {experienceInformation.map((item, index) => <center><Box sx={{
                    width: {
                        sm: '100%',
                        md: '65%',
                        lg: '65%',
                    }
                }}>
                    <DraggableExperienceBox
                        key={index}
                        experience={item}
                        index={index}
                        moveExperience={moveExperience}
                        removeExperience={removeExperienceAtIndex}
                    />
                </Box></center>)}
                {addMoreExperience && <Box>
                    <Grid container>
                        <Grid xs={0} sm={0} md={2} lg={2} item>

                        </Grid>
                        <Grid xs={12} sm={12} md={8} lg={8} item>
                            <Grid style={{ "marginTop": "3%" }} container spacing={2}>
                                <Grid xs={12} sm={12} md={6} lg={6} item><TextField style={{ "width": "100%" }} value={currentExperience.title} onChange={onExperienceChange} id="education" name='title' type='text' placeholder='Degree in' /></Grid>
                                <Grid lg={6} item><TextField style={{ "width": "100%" }} value={currentExperience.location} onChange={onExperienceChange} name='location' type='text' placeholder='Institute Name' /></Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} item>
                                    <Typography variant='h6'>Start Date</Typography>
                                    <TextField style={{ "width": "100%" }} value={currentExperience.started_from} onChange={onExperienceChange} name='started_from' type='date' placeholder='Started From' />
                                </Grid>
                                <Grid xs={12} sm={12} md={6} lg={6} item>
                                    <Typography variant='h6'>End Date</Typography>
                                    <TextField style={{ "width": "100%" }} value={currentExperience.ended_at} onChange={onExperienceChange} name='ended_at' type='date' placeholder='Ended At' />
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={12} item>
                                    <ReactQuill
                                        value={currentExperience.description}
                                        onChange={onExperienceDescriptionChange}
                                        placeholder="Type Description here"
                                        theme='snow'
                                        color='white'
                                        style={{ "borderRadious": "10px" }}
                                    />
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={12} item align='center'>
                                    <center>
                                        <Button style={{ "color": "white", "backgroundColor": "#ffb400", "marginTop": "5%", "minWidth": '60px', "minHeight": '35px' }} onClick={addAnotherExperience} name="education" variant='contained'>ADD</Button>
                                    </center>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={0} sm={0} md={2} lg={2} item>

                        </Grid>
                    </Grid>
                </Box>}
                {!addMoreExperience && <Grid xs={12} sm={12} md={12} lg={12} item align='center'>
                    <center>
                        <Button style={{ "color": "white", "backgroundColor": "#ffb400", "marginTop": "5%", "minWidth": '80px', "minHeight": '35px' }} onClick={handleAddMoreExperience} name="education" variant='contained'>Add More</Button>
                    </center>
                </Grid>}
            </form >
        </Box >
    )
}