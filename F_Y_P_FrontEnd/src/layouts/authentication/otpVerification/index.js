
import styled from 'styled-components';
import { Box, Button, Typography } from '@mui/material';
import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import '../sign-in/index';
import CircularProgress from '@material-ui/core/CircularProgress';
// import UserContext from 'userStates/userContext/userContext';
import Appcontext from '../../../States/appContext';
import { toast } from 'react-toastify';
import ResetPassword from '../../../layouts/authentication/resetPassword'
const OTPInputContainer = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    textAlign: center;
`;

const OTPInputBox = styled.input`
  width: 20%;
  height: 50px;
  font-size: 18px;
  text-align: center;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const OTPInput = () => {
    const [otp, setOTP] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [disableButton, setDisableButton] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e, index) => {
        const { value } = e.target;
        if (isNaN(value)) return; // Only allow numeric input

        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (index < 3 && value !== '') {
            // Move focus to the next input box
            inputRefs.current[index + 1].focus();
        }

        if (newOTP.every((digit) => digit !== '')) {
            // Call the onComplete callback when all input fields have a value
            setDisableButton(false)
            handleFormSubmit(newOTP.join(''));
        }
    };
    const navigator = useNavigate();
    const app = useContext(Appcontext);
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
        osition: 'relative',
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
            xs: '1%', // For screens < 'sm'
            sm: '1%', // For screens between 'sm' and 'md'
            md: '1%',
            lg: '1%',
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
    const [submitted, setSubmitted] = useState({
        "emailError": false,
        "emailValidationError": false,
        "emailIncorrectCheck": false,
    });
    const [userData, setUserData] = useState({
        "password": "",
        "confirmPassword": "",
    })
    const handleInputChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleFormSubmit = async (otp, event) => {
        if (event) {
            event.preventDefault();
        }
        let hasError = false;
        setIsLoading(true);
        setDisableButton(true);
        if (pageState === 'verification') {
            await fetch(`${baseUrl}user/otp-verification?otp_id=${localStorage.getItem('otp_id')}&otp=${otp}`)
                .then(res => res.json()).then(response => {
                    if (response.status === true) {
                        toast.success(response.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        setIsLoading(false);
                        setDisableButton(false);
                        setPageState('reset')
                        navigator("/reset-password")
                    }
                    else {
                        toast.error(response.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        setOTP(['', '', '', ''])
                        setIsLoading(false);
                    }
                })
        }
        else {

        }


    };
    const handleResetFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setDisableButton(true);
        let hasError = false;
        if (userData.password === '') {
            setSubmitted((prevState) => ({ ...prevState, passwordError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else if (userData.password.length < 5) {
            setSubmitted((prevState) => ({ ...prevState, passwordValidatonError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else {
            setSubmitted((prevState) => ({ ...prevState, passwordValidatonError: false, passwordError: false }));
        }

        if (userData.confirmPassword === '') {
            setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else if (userData.confirmPassword !== userData.password) {
            setSubmitted((prevState) => ({ ...prevState, confirmPasswordError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else {
            setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: false, confirmPasswordError: false }));
        }

        if (!hasError) {
            await fetch(`${baseUrl}user/reset-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: userData.password,
                    otp_id: localStorage.getItem("otp_id")
                })
            }).then(res => res.json()).then(response => {
                if (response.status === true) {
                    localStorage.clear();
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    navigator("/login")
                }
                else {
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    setIsLoading(false);
                    setDisableButton(false);

                }
            })
        }
    }
    const [pageState, setPageState] = useState('verification')
    return (
        <>
            <Box className='auth-main'><Box className='sign-in-secondary'></Box>
                {pageState === 'verification' ? <Box sx={signBox} style={{ "backgroundColor": "white" }}>
                    <img style={boxLogo} src={logo} />
                    <center><Typography sx={loginButton}>Verification</Typography></center><br /><br />
                    <center><Box>
                        <form onSubmit={handleFormSubmit} style={{ width: '60%' }}>
                            <OTPInputContainer>
                                <center>{otp.map((digit, index) => (
                                    <OTPInputBox
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                    />
                                ))}</center>
                            </OTPInputContainer>
                            <br /><br /><br />
                            <center><Button
                                disabled={disableButton}
                                style={{
                                    color: 'white',
                                    backgroundColor: '#ffb400',
                                    width: '120%',
                                    marginLeft: '-10%',
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
                                    'Verify Code'
                                )}
                            </Button></center>
                        </form>

                    </Box></center>
                </Box> : <ResetPassword
                    handleResetFormSubmit={handleResetFormSubmit}
                    setSubmitted={setSubmitted}
                    handleInputChange={handleInputChange}
                    userData={userData}
                    submitted={submitted}
                    isLoading={isLoading}
                    disableButton={disableButton}
                />}
            </Box>

        </>

    );
};

export default OTPInput;
