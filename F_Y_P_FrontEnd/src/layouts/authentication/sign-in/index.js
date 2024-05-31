import { Box, Button, Typography } from '@mui/material';
import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../../assets/images/logo.png';
import logo from '../../../assets/images/logo.png';
import './index.css';
import InputCompoenet from '../../../layouts/authentication/sign-in/components/Inputs'
import UserContext from '../../../userStates/userContext/userContext';
import Appcontext from '../../../States/appContext';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Default() {
  const navigator = useNavigate();
  const app = useContext(Appcontext);
  const { baseUrl } = app;
  const signBox = {
    width: {
      xs: '90vw', // For screens < 'sm'
      sm: '80vw', // For screens between 'sm' and 'md'
      md: '70vw',
      lg: '505px', // For screens >= 'md'
    },
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '16px',
    padding:{
      sm:'0px 30px 2% 30px',
      md:'0px 30px 2% 30px',
      lg:'0px 30px 2% 30px',
      xl:'2% 60px 4% 60px'
    }
  };
  const boxLogo = {
    position: 'relative',
    height: '6%',
    width: '40%',
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
      xxxl:'35px' // For screens >= 'md'
    },
    fontWeight: '600',
    marginBottom: {
      xs: '2%', // For screens < 'sm'
      sm: '2%', // For screens between 'sm' and 'md'
      md: '2%',
      lg: '2%',
      xxxl:'5%' // For screens >= 'md'
    },
    marginTop:{
      xs: '2%', // For screens < 'sm'
      sm: '2%', // For screens between 'sm' and 'md'
      md: '2%',
      lg: '2%',
      xxxl:'3%' // For screens >= 'md'
    },
    fontFamily: 'Roboto'
  }
  const inputRef = useRef();
  const [submitted, setSubmitted] = useState({
    "emailError": false,
    "emailValidationError": false,
    "emailIncorrectCheck": false,
    "passwordError": false,
    "passwordValidatonError": false,
    "passwordIncorrectCheck": false
  });
  const [userData, setUserData] = useState({
    "email": "",
    "password": ""
  })
  const User = useContext(UserContext);
  const { setUser } = User;
  const [disableButton, setDisableButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    if (userData.password === '') {
      setSubmitted((prevState) => ({ ...prevState, passwordError: true }));
      setDisableButton(false);
      setIsLoading(false);
      hasError = true;
    } else if (userData.password.length < 5) {
      setSubmitted((prevState) => ({ ...prevState, passwordValidatonError: true }));
      setDisableButton(false);
      setIsLoading(false);
      hasError = true;
    } else {
      setSubmitted((prevState) => ({ ...prevState, passwordValidatonError: false, passwordError: false }));
    }
    if (userData.email === '') {
      setSubmitted((prevState) => ({ ...prevState, emailError: true }));
      setDisableButton(false);
      setIsLoading(false);
      hasError = true;
    } else if (!validateEmail(userData.email)) {
      setSubmitted((prevState) => ({ ...prevState, emailValidationError: true }));
      setDisableButton(false);
      setIsLoading(false);
      hasError = true;
    } else {
      setSubmitted((prevState) => ({ ...prevState, emailValidationError: false, emailError: false }));
    }

    if (!hasError) {
      await fetch(`${baseUrl}user/sign-in-user`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password
        })
      }).then(res => res.json()).then(response => {
        if (response.status === true) {
          setUser(response.user);
          localStorage.setItem('token', response.jwt_token);
          localStorage.setItem('user_id', response.user.user_id);
          localStorage.setItem('name', response.user.user_name);
          setDisableButton(false);
          setIsLoading(false);
          navigator("/dashboard");
        }
        else {
          setDisableButton(false);
          setIsLoading(false);
          if (response.message === 'Email or password incorrect') {
            setSubmitted((prevState) => ({ ...prevState, passwordIncorrectCheck: true }));
          }
          else {
            setSubmitted((prevState) => ({ ...prevState, emailIncorrectCheck: true }));
          }
        }
      })
    }


  };
  return (
    <Box>
      <Box className='auth-main'><Box className='sign-in-secondary'></Box> 
      <Box sx={signBox} style={{ "backgroundColor": "white" }}>
        <img style={boxLogo} src={logo} />
        <center><Typography sx={loginButton}>Sign In</Typography></center>
        <center><Box>
          <form onSubmit={handleFormSubmit} style={{ m: 1, width: '80%' }}>
            <InputCompoenet
              setSubmitted={setSubmitted}
              handleInputChange={handleInputChange}
              userData={userData}
              submitted={submitted}
            />
            <br /><br />
            {/* <OrSeperator />
            <Box position={'relative'}>
              <center>
                <SigninMethodButtons google="Sign in with google" linkedin="Sign in with linkedin" />
              </center>
            </Box> */}
            <br />
            <center><Button
              disabled={disableButton}
              style={{
                color: 'white',
                backgroundColor: '#ffb400',
                width: '90%',
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
                'Sign In'
              )}
            </Button></center>
            <Box marginTop={'2%'}><Typography>Don't have an acount? <Link to='/signup' style={{ "color": "#2A62FF", fontWeight: '600', textDecoration:'none' }}>Sign up</Link> </Typography></Box>
          </form>

        </Box></center>
      </Box>
      </Box>

    </Box>
  )
}
