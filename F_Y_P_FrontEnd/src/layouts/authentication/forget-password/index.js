import { Box, Button, Typography } from '@mui/material';
import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from '../../../assets/images/logo.png';
import '../sign-in/index';
import './index.css'
import UserContext from '../../../userStates/userContext/userContext';
import Appcontext from '../../../States/appContext';
import { toast } from 'react-toastify';
export default function Default() {
    const navigator = useNavigate();
    const app = useContext(Appcontext);
    const [disableButton, setDisableButton] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const { baseUrl } = app;
    const signBox = {
        width: {
            xs: '80vw', // For screens < 'sm'
            sm: '70vw', // For screens between 'sm' and 'md'
            md: '60vw',
            lg: '505px', // For screens >= 'md'
        },
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '16px',
        padding: {
            xs: '2% 30px 4% 30px',
            sm: '2% 30px 4% 30px',
            md: '2% 30px 4% 30px',
            lg: '2% 30px 4% 30px'
        }
    };
    const boxLogo = {
        position: 'relative',
        height: '8%',
        width: '45%',
        marginTop: '5%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
    }
    const loginButton = {
        position: 'relative',
        color: '#2a62ff',
        fontSize: {
            xs: '30px', // For screens < 'sm'
            sm: '30px', // For screens between 'sm' and 'md'
            md: '30px',
            lg: '30px',
            xxxl: '35px' // For screens >= 'md'
        },
        fontWeight: '600',
        marginBottom: {
            xs: '2%', // For screens < 'sm'
            sm: '2%', // For screens between 'sm' and 'md'
            md: '2%',
            lg: '2%',
            xxxl: '5%' // For screens >= 'md'
        },
        marginTop: {
            xs: '2%', // For screens < 'sm'
            sm: '2%', // For screens between 'sm' and 'md'
            md: '2%',
            lg: '2%',
            xxxl: '3%' // For screens >= 'md'
        },
        fontFamily: 'Roboto'
    }
    const inputRef = useRef();
    const [submitted, setSubmitted] = useState({
        "emailError": false,
        "emailValidationError": false,
        "emailIncorrectCheck": false,
    });
    const [userData, setUserData] = useState({
        "email": "",
    })
    const User = useContext(UserContext);
    const { setUser } = User;
    const validateEmail = (email) => {
        // Regular expression to match the email pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleInputChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let hasError = false;
        setDisableButton(true);
        setIsLoading(true)
        if (userData.email.length < 1) {
            setSubmitted((prevState) => ({ ...prevState, emailError: true }));
            setDisableButton(false);
            setIsLoading(false)
            hasError = true;
        } else if (!validateEmail(userData.email)) {
            setSubmitted((prevState) => ({ ...prevState, emailValidationError: true }));
            setDisableButton(false);
            setIsLoading(false)
            hasError = true;
        } else {
            setSubmitted((prevState) => ({ ...prevState, emailValidationError: false, emailError: false }));
        }

        if (!hasError) {
            await fetch(`${baseUrl}user/forget-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email,
                })
            }).then(res => res.json()).then(response => {
                if (response.status === true) {
                    localStorage.setItem('otp_id', response.results.otp_id)
                    navigator("/enter-otp")
                }
                else {
                    toast.error(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    setDisableButton(false);
                    setIsLoading(false)

                }
            })
        }


    };
    return (

        <Box className='auth-main'><Box className='sign-in-secondary'></Box>
            <Box sx={signBox} style={{ "backgroundColor": "white" }}>
                <img style={boxLogo} src={logo} />
                <center><Typography sx={loginButton}>Forget Password</Typography></center><br /><br />
                <center>
                    <Box>
                        <form onSubmit={handleFormSubmit} style={{ m: 1, width: '80%' }}>
                            <div tyle={{ "position": "relative", "height": "80px" }}>
                                <input onClick={() => {
                                    setSubmitted((prevState) => ({ ...prevState, emailIncorrectCheck: false, emailValidationError: false, emailError: false }));
                                }} onChange={handleInputChange} value={userData.email} name='email'
                                    className={`${submitted.emailError || submitted.emailValidationError || submitted.emailIncorrectCheck ? 'signin-input-error' : 'signin-input'}`}
                                    placeholder='Email' label="Outlined" type='text' />
                                <p className={`${submitted.emailError || submitted.emailValidationError || submitted.emailIncorrectCheck ? 'error-text-forgetPassword' : 'hidden-text'}`}>
                                    {submitted.emailError ? 'Email is required' : submitted.emailValidationError ? 'Enter a Valid Email' : submitted.emailIncorrectCheck ? 'Email does not exsists' : ''}
                                </p>
                            </div>
                            <br /><br /><br />
                            <center><Button
                                disabled={disableButton}
                                style={{
                                    color: 'white',
                                    backgroundColor: '#ffb400',
                                    width: '70%',
                                    fontSize: '20px',
                                    fontWeight: '500',
                                    height: '40px',
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
                                    'Send Code'
                                )}
                            </Button></center>
                        </form>

                    </Box></center>
            </Box>


        </Box>
    )
}
