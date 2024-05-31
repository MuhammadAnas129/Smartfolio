import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Navbar from '../../examples/Navbars/DashboardNavbar'
import React, { useContext, useEffect, useState } from 'react'
import SettingsIcon from '../../assets/icons/settingsIcon.png'
import LogoutIcon from '../../assets/icons/logoutIcon.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import imagePlaceholder from '../../assets/icons/image_placeholder.png'
import cameraIcon from '../../assets/icons/cameraIcon.png'
import './index.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import EducationAccountInput from './components/educationInput'
import ExperienceAccountInput from './components/experienceInput'
import baseUrl from '../../url'
import axios from 'axios'
import ChangePassword from './components/chnagePassword'
import { TemplateInfoContext } from '../../layouts/Templates/resumeState/resumeContext'
import { ClipLoader } from 'react-spinners';
export default function Default() {
    const userResumes = useContext(TemplateInfoContext);
    const { setUserCvs } = userResumes;
    const [isExperienceAddLoading, setIsExperienceAddLoading] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [setIsEducationAddLoading, setsetIsEducationAddLoading] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [profile_img, setProfile_img] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [startLoader, setStartLoader] = useState(true)
    const [educationIndex, setEducationIndex] = useState(0)
    const [addMoreEducation, setAddMoreEducation] = useState(false);
    const [experienceIndex, setExperienceIndex] = useState(0)
    const [addMoreExperience, setAddMoreExperience] = useState(false);
    const [submitted, setSubmitted] = useState({
        "userNameError": false,
        "current_password_Error": false,
        "passwordError": false,
        "passwordValidate": false,
        "CpasswordError": false,
        "CpasswordValidate": false
    });
    const [userData, setUserData] = useState({
        "user_name": "",
        "phone": 0
    })
    const [passwordData, setPasswordData] = useState({
        "current_password": '',
        "password": "",
        "cofirmPassword": "",
    })
    const [educationformation, setEducationInformation] = useState([]);
    const [currentEducation, setCurrentEducation] = useState({
        "title": "",
        "institute": "",
        "started_from": "",
        "ended_at": "",
        "description": ""
    });
    const [experienceInformation, setExperienceInformation] = useState([]);
    const [removedExperience, setRemovedExperience] = useState([]);
    const [removedEducation, setRemovedEducation] = useState([]);
    const [currentExperience, setCurrentExperience] = useState({
        "title": "",
        "location": "",
        "started_from": "",
        "ended_at": "",
        "description": ""
    });
    const onEducationChange = (event) => {
        const { value } = event.target;
        setCurrentEducation(prevState => {
            return {
                ...prevState,
                [event.target.name]: value,
            };
        });
    }
    const getUserData = async () => {
        setStartLoader(true)
        await fetch(`${baseUrl}user/get-user-data?current_user_id=${localStorage.getItem('user_id')}`).then(res => res.json())
            .then(response => {
                setUserData({ ['user_name']: response.results[0].user_name, ['phone']: response.results[0].phone });
                response.results[0].education && setEducationIndex(response.results[0].education.length);
                response.results[0].education && setEducationInformation((prevState) => {
                    let newState = [...response.results[0].education, ...prevState]
                    return newState
                });

                response.results[0].experience && setExperienceIndex(response.results[0].experience.length);
                response.results[0].experience && setExperienceInformation((prevState) => {
                    let newState = [...response.results[0].experience, ...prevState]
                    return newState
                });
                setProfile_img(response.results[0].profile_img);
            })
        setStartLoader(false)
    }
    useEffect(() => {
        getUserData()
    }, [])

    const onExperienceChange = (event) => {
        const { value } = event.target;
        setCurrentExperience(prevState => {
            return {
                ...prevState,
                [event.target.name]: value,
            };
        });

    }
    const handleInputChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const onEducationDescriptionChange = (event) => {
        setCurrentEducation(prevState => {
            return {
                ...prevState,
                'description': event,
            };
        });
    }
    const onExperienceDescriptionChange = (event) => {
        setCurrentExperience(prevState => {
            return {
                ...prevState,
                'description': event,
            };
        });
    }
    const onImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImage(event.target.files[0]);
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };

            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            axios.post(`${baseUrl}user/uploadUserimage?user_id=${localStorage.getItem('user_id')}`, formData).then(response => {
                if (response.data.status) {
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                    getUserData()
                }
                else {
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                }
            })

        } else {
            setPreviewImage('');
        }
    }
    const handlePasswordChange = (event) => {
        setPasswordData({ ...passwordData, [event.target.name]: event.target.value })
    }
    const navigator = useNavigate()
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        setDisableButton(true);
        setIsLoading(true);
        let hasError = false;
        if (passwordData.current_password === '') {
            setSubmitted((prevState) => ({ ...prevState, current_password_Error: true }));
            setDisableButton(false);
            setIsLoading(false);
            hasError = true;
        }
        else {
            setSubmitted((prevState) => ({ ...prevState, current_password_Error: false }));
        }
        if (passwordData.password === '') {
            setSubmitted((prevState) => ({ ...prevState, passwordError: true }));
            setDisableButton(false);
            setIsLoading(false);
            hasError = true;
        }
        else if (passwordData.password.length < 5) {
            setSubmitted((prevState) => ({ ...prevState, passwordValidate: true }));
            setDisableButton(false);
            setIsLoading(false);
            hasError = true;
        }
        else {
            setSubmitted((prevState) => ({ ...prevState, passwordValidate: false, passwordError: false }))
            hasError = false;
        }
        if (passwordData.cofirmPassword === '') {
            setSubmitted((prevState) => ({ ...prevState, CpasswordError: true }));
            setDisableButton(false);
            setIsLoading(false);
            hasError = true;
        }
        else if (passwordData.password !== passwordData.cofirmPassword) {
            setSubmitted((prevState) => ({ ...prevState, CpasswordValidate: true }));
            setDisableButton(false);
            setIsLoading(false);
            hasError = true;
        }
        else {
            setSubmitted((prevState) => ({ ...prevState, CpasswordError: false, CpasswordError: false }))
            hasError = false;
        }
        if (!hasError) {
            await fetch(`${baseUrl}user/update-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    current_password: passwordData.current_password,
                    new_password: passwordData.password,
                    user_id: localStorage.getItem('user_id')
                })
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                    setDisableButton(false);
                    setIsLoading(false)
                }
                else {
                    toast.error(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                    setDisableButton(false);
                    setIsLoading(false)
                }
            })
        }
        setDisableButton(false);
        setIsLoading(false);
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setDisableButton(true);
        setIsLoading(true)
        let hasError = false;
        if (userData.user_name === '') {
            setSubmitted((prevState) => ({ ...prevState, userNameError: true }));
            setDisableButton(false);
            hasError = true;
        } else {
            setSubmitted((prevState) => ({ ...prevState, userNameError: false }));
        }
        let experienceError = false;
        let educationError = false;
        if (!hasError) {
            await fetch(`${baseUrl}user/update-user-info?user_id=${localStorage.getItem('user_id')}&phone=${userData.phone}&user_name=${userData.user_name}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'applicaton/json'
                },
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                    setDisableButton(false);

                }
                else {
                    toast.error(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                    setDisableButton(false);
                }
            })
            await Promise.all(
                removedExperience.map(async (item, index) => {
                    if (item.work_experience_id) {
                        await fetch(`${baseUrl}workExperience/remove-user-workExperience`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "experience_id": item.work_experience_id,
                                "user_id": localStorage.getItem('user_id')
                            })
                        }).then(res => res.json()).then(async response => {
                            if (response.status) {
                                
                                await fetch(`${baseUrl}workExperience/delete-experience?experience_id=${item.work_experience_id}`, {
                                    method: 'DELETE',
                                }).then(res => res.json()).then(response => {
                                    if (!response.status) {
                                        experienceError = true;
                                    }

                                })
                            }
                        })
                    }
                })
            )
            if (experienceInformation.length > 0) {
                await Promise.all(
                    experienceInformation.map(async (item, index) => {
                        if (!item.work_experience_id) {
                            await fetch(`${baseUrl}workExperience/add-work-experience`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "title": item.title,
                                    "location": item.location,
                                    "started_from": item.started_from,
                                    "ended_at": item.ended_at,
                                    "description": item.description,
                                    "user_id": localStorage.getItem('user_id'),
                                    "company": "mtechub"
                                })
                            }).then(res => res.json()).then(async response => {
                                if (response.status) {
                                    await fetch(`${baseUrl}workExperience/add-user-workExperience`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "experience_id": response.results.work_experience_id,
                                            "user_id": localStorage.getItem('user_id')
                                        })
                                    }).then(res => res.json()).then(response => {
                                        if (!response.status) {
                                            experienceError = true
                                        }
                                    })
                                }
                                else {
                                    experienceError = true
                                }
                            })
                        }
                    })
                )
            }
            await Promise.all(
                removedEducation.map(async (item, index) => {
                    if (item.education_id) {
                        await fetch(`${baseUrl}education/remove-user-education`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "education_id": item.education_id,
                                "user_id": localStorage.getItem('user_id')
                            })
                        }).then(res => res.json()).then(async response => {
                            if (response.status) {
                                await fetch(`${baseUrl}education/delete-education?education_id=${item.education_id}`, {
                                    method: 'DELETE',
                                }).then(res => res.json()).then(response => {
                                    if (!response.status) {
                                        educationError = true;
                                    }

                                })
                            }
                        })
                    }
                })
            )
            if (educationformation.length > 0) {
                await Promise.all(
                    educationformation.map(async (item, index) => {
                        if (!item.education_id) {
                            await fetch(`${baseUrl}education/add-education`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    "title": item.title,
                                    "institute": item.institute,
                                    "started_from": item.started_from,
                                    "ended_at": item.ended_at,
                                    "description": item.description,
                                    "user_id": localStorage.getItem('user_id'),
                                })
                            }).then(res => res.json()).then(async response => {
                                if (response.status) {
                                    await fetch(`${baseUrl}education/add-user-education`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            "education_id": response.results.education_id,
                                            "user_id": localStorage.getItem('user_id')
                                        })
                                    }).then(res => res.json()).then(response => {
                                        if (!response.status) {
                                            educationError = true
                                        }
                                    })
                                }
                                else {
                                    educationError = true
                                }
                            })
                        }
                    })
                )
            }
            if (experienceError) {
                toast.error('Could not update experience', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            if (educationError) {
                toast.error('Could not update education', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            if(!educationError && !experienceError){
                window.location.reload()
            }
        }
        
        setIsLoading(false)
    };
    const addAnotherEducation = async () => {
        if (currentEducation.title && currentEducation.institute && currentEducation.started_from
            && currentEducation.ended_at && currentEducation.description) {
            setEducationInformation(prevState => {
                let newState = [...prevState];
                newState.push(currentEducation);
                return newState;
            })
            setCurrentEducation({
                "title": "",
                "institute": "",
                "started_from": "",
                "ended_at": "",
                "description": ""
            })
            setAddMoreEducation(false)
        }
        else {
            toast.error('All Fields are required', {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
    const addAnotherExperience = async () => {
        if (currentExperience.title && currentExperience.location && currentExperience.started_from
            && currentExperience.ended_at && currentExperience.description) {
            setExperienceInformation(prevState => {
                let newState = [...prevState];
                newState.push(currentExperience);
                return newState;
            })
            setCurrentExperience({
                "title": "",
                "location": "",
                "started_from": "",
                "ended_at": "",
                "description": ""
            },)
            setAddMoreExperience(false)
        }
        else {
            toast.error('All Fields are required', {
                position: toast.POSITION.TOP_CENTER,
            });
        }


    }
    if (startLoader) {
        return <>
            <Navbar />
            <ClipLoader
                color={'#2a62ff'}
                loading={true}
                cssOverride={{
                    display: "block",
                    margin: "20% auto",
                    borderColor: "red",
                }}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            /></>
    }
    return (
        <>
            <Navbar />
            <Container sx={{ marginTop: '40px' }}>
                {changePassword && <ChangePassword
                    setChangePassword={setChangePassword}
                    setSubmitted={setSubmitted}
                    submitted={submitted}
                    passwordData={passwordData}
                    handlePasswordChange={handlePasswordChange}
                    handlePasswordSubmit={handlePasswordSubmit}
                    isLoading={isLoading}
                    disableButton={disableButton}
                />}
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={6.5} lg={8.5}>
                        <Typography sx={{ fontSize: '25px', color: '#2a62ff' }} fontFamily={'Roboto'}>Account Information</Typography>
                    </Grid>
                    <Grid item sm={4} md={3} lg={1.8}>
                        <Box height={'50px'}><Button onClick={() => { setChangePassword(true) }} style={{ "color": "white", "backgroundColor": "#2a62ff", "margin": '5px 0px 0px 0px', height: '100%' }}
                            name="personal" variant='contained'>
                            Change Password
                        </Button></Box>
                    </Grid>
                    <Grid item sm={2} md={1.5} lg={0.8}>
                        <Box height={'50px'}>
                            <Button onClick={() => { navigator("/settings") }} sx={{ height: '120%' }}><img height={'100%'} src={SettingsIcon} /></Button>
                        </Box>
                    </Grid>
                    <Grid item sm={2} md={1.5} lg={0.8}>
                        <Box height={'50px'}>
                            <Button onClick={() => {
                                localStorage.clear();
                                setUserCvs([]);
                                navigator('/templates');
                                toast.success("Logged Out Sucessfully", {
                                    position: toast.POSITION.TOP_RIGHT,
                                });
                            }} sx={{ height: '120%', marginLeft: '-10px' }}><img height={'100%'} src={LogoutIcon} /></Button>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ marginTop: '8%' }}>
                    <Grid item xs={4.5} sm={5.5} md={5.5} lg={5.5}></Grid>
                    <Grid item sm={1} md={1} lg={1}>
                        <label htmlFor="fileInput" className="custom-image-upload-account">
                            <img height={'110px'} width={'110px'} src={profile_img ? `${baseUrl}${profile_img}` : previewImage ? previewImage : imagePlaceholder}
                                style={{ borderRadius: previewImage || profile_img ? "50%" : "0%" }} />
                            <img height={'30px'} width={'30px'} style={{
                                position: 'absolute',
                                top: '70%',
                                left: '80px'
                            }} src={cameraIcon} />
                            <input onChange={onImageChange} style={{ display: 'none' }} type="file" id="fileInput" />
                        </label>
                    </Grid>

                </Grid>

                <Box sx={{ width: '100%', marginTop: '40px' }}>
                    <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                        <Grid container spacing={10}>
                            <Grid item xs={0} sm={0} md={2} lg={2}>

                            </Grid>
                            <Grid item xs={11} sm={12} md={4} lg={4}>
                                <input onClick={() => {
                                    setSubmitted((prevState) => ({ ...prevState, userNameError: false }));
                                }} onChange={handleInputChange} value={userData.user_name} name='user_name'
                                    className={`${submitted.userNameError ? 'account-input-error' : 'account-input'}`}
                                    placeholder='User Name' label="Outlined" type='text' />
                                <p className={`${submitted.userNameError ? 'account-error-text' : 'account-hidden-text'}`}>
                                    {submitted.userNameError ? 'Username is required' : ''}
                                </p>
                            </Grid>
                            <Grid item xs={11} sm={12} md={4} lg={4}>
                                <input onChange={handleInputChange} value={userData.phone} type='number' name='phone' placeholder='Phone' className='account-input' />
                            </Grid>
                        </Grid>
                        <EducationAccountInput
                            onEducationChange={onEducationChange}
                            educationformation={educationformation}
                            onEducationDescriptionChange={onEducationDescriptionChange}
                            educationIndex={educationIndex}
                            setsEducationIndex={setEducationIndex}
                            setAddMoreEducation={setAddMoreEducation}
                            setEducationInformation={setEducationInformation}
                            addAnotherEducation={addAnotherEducation}
                            addMoreEducation={addMoreEducation}
                            setIsEducationAddLoading={setIsEducationAddLoading}
                            currentEducation={currentEducation}
                            setRemovedEducation={setRemovedEducation}
                        />
                        <ExperienceAccountInput
                            onExperienceChange={onExperienceChange}
                            experienceInformation={experienceInformation}
                            onExperienceDescriptionChange={onExperienceDescriptionChange}
                            setExperienceInformation={setExperienceInformation}
                            setsExperienceIndex={setExperienceIndex}
                            experienceIndex={experienceIndex}
                            addMoreExperience={addMoreExperience}
                            addAnotherExperience={addAnotherExperience}
                            setAddMoreExperience={setAddMoreExperience}
                            isExperienceAddLoading={isExperienceAddLoading}
                            currentExperience={currentExperience}
                            setRemovedExperience={setRemovedExperience}
                        />
                        <Grid container columnSpacing={10} rowSpacing={4} sx={{ marginTop: '20px', marginBottom: '80px' }}>
                            <Grid item sx={0} sm={0} md={2} lg={2}>

                            </Grid>
                            <Grid item sx={12} sm={12} md={8} lg={8}>
                                <center><Button
                                    disabled={disableButton}
                                    style={{
                                        color: 'white',
                                        backgroundColor: '#ffb400',
                                        padding:'10px 45px',
                                        fontSize: '18px',
                                        fontWeight: '500',
                                        height: '47px',
                                        position: 'relative', // Add this to allow absolute positioning of the loader
                                    }}
                                    type='submit'
                                    variant='contained'
                                >
                                    {isLoading ? (
                                        // If loading, show the CircularProgress component
                                        <CircularProgress size={24} style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />
                                    ) : (
                                        // If not loading, show the "Send Code" text
                                        'Update'
                                    )}
                                </Button></center>
                            </Grid>
                        </Grid>
                    </form>
                </Box>


            </Container >
        </>
    )
}
