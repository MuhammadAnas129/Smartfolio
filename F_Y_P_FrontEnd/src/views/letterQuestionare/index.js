import { Button, TextField, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import appContext from "../../appState/appContext";
import { Configuration, OpenAIApi } from "openai";
// import baseUrl from '../../url';
import { useNavigate } from "react-router-dom";
import Loader from "components/loader"
const configuration = new Configuration({
    apiKey: 'sk-proj-NkjnaGBd53lcqIOP8unDT3BlbkFJe0jIdEHtJ1GymqkoTAd9'
})
// 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
// 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
// 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
const openai = new OpenAIApi(configuration);
export default function Default() {
    const navigator = useNavigate()
    const [showLoader, setshowLoadere] = useState(false);
    const [strengths] = useState([
        'Collaboration',
        'Critical Thinking',
        'Communication',
        'Customer Service',
        'Decision Making',
        'Delegation',
        'Involation',
        'Interpersonal',
        'Leadership',
        'Management',
    ])
    const [experienceYears] = useState([
        'Less then one',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10+',
    ])
    const [schoolTypes] = useState([
        'High School',
        'Trade School',
        'College',
        'Graduate School'
    ])
    const [workingStyle] = useState([
        {
            value: 'Artistic',
            description: 'You thrive in dynamic environments driven by innovation and creativity.'
        },
        {
            value: 'Enterprising',
            description: 'You’re accustomed to leading teams with empowering and decisive task delegation. '
        },
        {
            value: 'Organized',
            description: 'You bring structure and focus to streamline tasks.'
        },
        {
            value: 'Practical',
            description: 'You go above and beyond to meet goals and ensure timely task completion.'
        },
        {
            value: 'Service-Oriented',
            description: 'You excel in collaborative situations and enjoy helping others.'
        },
    ])
    const appState = useContext(appContext)
    const { letterQuestionare, setletterQuestionare,/*letter,*/ setLetter } = appState
    const handleAddStrengths = (index) => {
        setletterQuestionare(prevState => {
            let newState = { ...prevState };
            newState.strengths.push(strengths[index])
            return newState
        })
    }
    const handleRemoveStrengths = (index) => {
        setletterQuestionare(prevState => {
            let newState = { ...prevState };
            newState.strengths.splice(index, 1)
            return newState
        })
    }
    const handlejobApplyingFor = (event) => {
        event.preventDefault()
        setletterQuestionare(prevState => {
            let newState = { ...prevState }
            newState.jobApplyingFor[event.target.name] = event.target.value;
            return newState
        })
    }
    const handleAddExperience = (value) => {
        if (letterQuestionare.experience === value) {
            setletterQuestionare(prevState => {
                let newState = { ...prevState }
                newState.experience = '';
                return newState
            })
        } else {
            setletterQuestionare(prevState => {
                let newState = { ...prevState }
                newState.experience = value;
                return newState
            })
        }
    }
    const handleSpecificJob = (value) => {
        setletterQuestionare(prevState => {
            let newState = { ...prevState }
            newState.specificJob = value;
            return newState
        })
    }
    const handleInSchool = (value) => {
        setletterQuestionare(prevState => {
            let newState = { ...prevState }
            newState.isInSchool = value;
            return newState
        })
    }
    const handleKindOfSchool = (value) => {
        setletterQuestionare(prevState => {
            let newState = { ...prevState }
            newState.kindOfSchool = value;
            return newState
        })
    }
    const handleWorkingStyle = (value) => {
        setletterQuestionare(prevState => {
            let newState = { ...prevState }
            newState.workingStyle = value;
            return newState
        })
    }

    const handleLetterGeneration = async () => {
        setshowLoadere(true)
        const messages = [{
            role: 'user',
            content: `my name is ${localStorage.getItem('name')} and my email is ${localStorage.getItem('email')} and my phone is ${localStorage.getItem('phoneNo')} i am writting this 
            letter to HR. Dont includes addresses neither of mine or recipeint. The company name is ${letterQuestionare.jobApplyingFor.company}.Write a comprehensive cover letter for my job i am applying for by using the following details:
            my strenths are ${letterQuestionare.strengths} and i am applying for ${letterQuestionare.specificJob} and
            my experience is of ${letterQuestionare.experience} years and my recent job title is ${letterQuestionare.recentJobTitle} 
            ${letterQuestionare.isInSchool && 'i am currently in school'} ${letterQuestionare.kindOfSchool && `${letterQuestionare.kindOfSchool} 
            kind of school`}
            and my working style is ${letterQuestionare.workingStyle.value},  ${letterQuestionare.workingStyle.description} and i am apply for 
            ${letterQuestionare.jobApplyingFor.position} position and ${letterQuestionare.jobApplyingFor.company} company and my top skills are 
            ${letterQuestionare.skills}`
        }]
        const completion = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages });
        let newText = completion.data.choices[0].message.content;
        console.log(localStorage.getItem('_id'))
        console.log(newText)
        // newText = newText.replace(/\n/g, '<br>');
        setLetter(newText)
        navigator('/letter-view')
        setshowLoadere(false)
        
    }

return (
    <Box  sx={{ marginTop: '100px' , display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ maxWidth: '50vw', padding: '20px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', borderRadius: '10px', backgroundColor: '#E6FF94', marginBottom: '50px' }}>
            <Box>
                 <Typography sx={{
                    fontSize: '24px',
                    color: '#333',
                    fontWeight: '500',
                    letterSpacing: '0.1rem',
                    marginBottom: '20px',
                    fontFamily: 'Roboto Condensed, sans-serif'
                }}>Do you have a specific job in mind?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <Button variant='outlined' sx={{
                        flex: '1',
                        borderRadius: '20px',
                        padding: '15px',
                        fontWeight: letterQuestionare.specificJob ? '700' : '500',
                        color: 'white',
                        backgroundColor: letterQuestionare.specificJob ? '#40A578' : '#9DDE8B',
                        '&:hover': {
                            backgroundColor: '#40A578'
                        },
                        marginRight: '10px',
                        border: 'none'
                    }} onClick={() => handleSpecificJob(true)}>Yes</Button>
                    <Button variant='outlined' sx={{
                        flex: '1',
                        borderRadius: '20px',
                        padding: '15px',
                        fontWeight: !letterQuestionare.specificJob ? '700' : '500',
                        color: 'white',
                        backgroundColor: !letterQuestionare.specificJob ? '#40A578' : '#9DDE8B',
                        '&:hover': {
                            backgroundColor: '#40A578'
                        },
                        marginLeft: '10px',
                        border: 'none'
                    }} onClick={() => handleSpecificJob(false)}>No</Button>
                </Box>
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
                <Typography sx={{
                    fontSize: '24px',
                    color: '#333',
                    fontWeight: '500',
                    letterSpacing: '0.1rem',
                    marginBottom: '20px'
                }}>What job are you applying for?</Typography>
                <Box sx={{ marginBottom: '30px' }}>
                    <Typography sx={{
                        fontSize: '14px',
                        color: 'rgba(0,0,0,0.5)',
                        fontWeight: '600',
                        marginBottom: '10px'
                    }}>Desired Position</Typography>
                    <TextField sx={{
                        width: '100%',
                    }} placeholder='Customer Sales Representative'
                        onChange={handlejobApplyingFor}
                        name='position'
                        value={letterQuestionare.jobApplyingFor.position}
                    />
                </Box>
                <Box>
                    <Typography sx={{
                        fontSize: '14px',
                        color: 'rgba(0,0,0,0.5)',
                        fontWeight: '600',
                        marginBottom: '10px'
                    }}>Company</Typography>
                    <TextField sx={{
                        width: '100%',
                    }} placeholder='ACME Technologies'
                        onChange={handlejobApplyingFor}
                        name='company'
                        value={letterQuestionare.jobApplyingFor.company}
                    />
                </Box>
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
                {letterQuestionare?.strengths?.map((item, index) => (
                    <Button variant='outlined' sx={{
                        margin: '5px',
                        color: 'white',
                        borderColor: 'black',
                        background: '#40A578',
                        '&:hover': {
                                     backgroundColor: '#E6FF94'
                                 },
                
                        borderRadius: '10px',
                        border: 'none'
                    }} onClick={() => handleRemoveStrengths(index)} key={index}>
                        <Remove />{item}
                    </Button>
                ))}
                <Typography sx={{
                    fontSize: '24px',
                    color: '#333333',
                    fontWeight: '500',
                    letterSpacing: '0.1rem',
                    marginBottom: '20px'
                }}>Choose your top 3 strengths.</Typography>
                {strengths.map((item, index) => (
                    <Button variant='outlined' sx={{
                        margin: '5px',
                        color: 'white',
                        backgroundColor: '#9DDE8B',
                        '&:hover': {
                         backgroundColor: '#40A578'
                         },
                        border: 'none',
                        borderRadius: '10px'
                    }} onClick={() => handleAddStrengths(index)} disabled={letterQuestionare?.strengths?.length >= 3} key={index}>
                        <Add />{item}
                    </Button>
                ))}
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
                <Typography sx={{
                    fontSize: '24px',
                    color: '#333333',
                    fontWeight: '500',
                    letterSpacing: '0.1rem',
                    marginBottom: '20px'
                }}>How many years of experience do you have?</Typography>
                {experienceYears.map((item, index) => (
                    <Button key={index} variant='outlined' sx={{
                        margin: '5px',
                        color: 'White',
                        backgroundColor: '#9DDE8B',
                         '&:hover': {
                            backgroundColor: '#40A578'
                             },
                        border: 'none',
                        borderRadius: '10px',
                        backgroundColor: letterQuestionare.experience === item ? '#40A578' : '#9DDE8B'
                    }} onClick={() => handleAddExperience(item)} disabled={(letterQuestionare?.experience && letterQuestionare?.experience !== item)}>
                        {item}
                    </Button>
                ))}
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
                <Typography sx={{
                    fontSize: '24px',
                    color: '#333333',
                    fontWeight: '500',
                    letterSpacing: '0.1rem',
                    marginBottom: '20px'
                }}>Are you in school?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant='outlined' sx={{
                        flex: '1',
                        borderRadius: '20px',
                        padding: '15px',
                        fontWeight: letterQuestionare.isInSchool ? '700' : '500',
                        color : '#fff',
                        border: letterQuestionare.isInSchool ? '2px solid #40A578' : 'none',
                        backgroundColor: letterQuestionare.isInSchool ? '#40A578' : '#9DDE8B',
                        '&:hover': {
                         backgroundColor: '#40A578',
                         color: '#fff'
                        },
                        marginRight: '10px'
                    }} onClick={() => handleInSchool(true)}>Yes</Button>
                    <Button variant='outlined' sx={{
                        flex: '1',
                        borderRadius: '20px',
                        padding: '15px',
                        fontWeight: !letterQuestionare.isInSchool ? '700' : '500',
                        color:'#fff',
                        border: !letterQuestionare.isInSchool ? '2px solid #40A578' : 'none',
                        backgroundColor: !letterQuestionare.isInSchool ? '#40A578' : '#9DDE8B',
                        '&:hover': {
                            backgroundColor: '#40A578',
                            color: '#fff'
                           },
                        marginLeft: '10px'
                    }} onClick={() => handleInSchool(false)}>No</Button>
                </Box>
            </Box>
            {letterQuestionare.isInSchool && (
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography sx={{
                        fontSize: '24px',
                        color: '#333333',
                        fontWeight: '500',
                        letterSpacing: '0.1rem',
                        marginBottom: '20px'
                    }}>What kind of school is it?</Typography>
                    {schoolTypes.map((item, index) => (
                        <Button key={index} variant='outlined' sx={{
                            width: '48%',
                            borderRadius: '20px',
                            padding: '15px',
                            margin: '1%',
                            fontWeight: letterQuestionare.kindOfSchool === item ? '700' : '500',
                            color:'#fff',
                            border: letterQuestionare.kindOfSchool === item ? '2px solid #40A578' : 'none',
                            backgroundColor: letterQuestionare.kindOfSchool === item ? '#40A578' : '#9DDE8B',
                            '&:hover': {
                                             backgroundColor: '#40A578'
                                      },
                        }} onClick={() => handleKindOfSchool(item)}>{item}</Button>
                    ))}
                </Box>
            )}
            <Box sx={{ marginBottom: '20px' }}>
                <Typography sx={{
                    fontSize: '24px',
                    color: '#333333',
                    fontWeight: '500',
                    letterSpacing: '0.1rem',
                    marginBottom: '20px'
                }}>What’s your working style?</Typography>
                {workingStyle.map((item, index) => (
                    <Button key={index} variant='outlined' sx={{
                        width: '48%',
                        borderRadius: '20px',
                        padding: '15px',
                        margin: '1%',
                        fontWeight: letterQuestionare.workingStyle === item.value ? '600' : '500',
                        color:  '#fff',
                        border: letterQuestionare.workingStyle === item.value ? '2px solid #40A578' : 'none',
                        backgroundColor: letterQuestionare.workingStyle === item.value ? '#40A578' : '#9DDE8B',
                        '&:hover': {
                            backgroundColor: '#40A578'
                     },
                    }} onClick={() => handleWorkingStyle(item.value)}>{item.value}<br />{item.description}</Button>
                ))}
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
                <Typography sx={{
                    fontSize: '24px',
                    color: '#333333',
                    fontWeight: '500',
                    letterSpacing: '0.1rem',
                    marginBottom: '20px'
                }}>What’s your most recent job title?</Typography>
                <Box>
                    <Typography sx={{
                        fontSize: '14px',
                        color: 'rgba(0,0,0,0.5)',
                        fontWeight: '600',
                        marginBottom: '10px'
                    }}>Job Title</Typography>
                    <TextField sx={{
                        width: '100%',
                    }} placeholder='Customer Sales Representative'
                        onChange={(e) => setletterQuestionare(prevState => {
                            let newState = { ...prevState };
                            newState.recentJobTitle = e.target.value;
                            return newState;
                        })}
                        name='recentJobTitle'
                        value={letterQuestionare.recentJobTitle}
                    />
                </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
                <Button 
                variant='contained' 
                onClick={handleLetterGeneration} 
                sx={{ 
                    backgroundColor: '#40A578', 
                    padding: '12px 20px', 
                    fontSize: '16px', 
                    borderRadius: '20px',
                    ':hover':{backgroundColor: '#006769'}
                     }}>
                    Generate Letter
                </Button>
            </Box>
        </Box>
    </Box>
    );
}
