import { Box, Button, Typography } from '@mui/material';
import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import './index.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import OrSeperator from '../../../layouts/authentication/sign-in/components/orSeperator'
import SigninMethodButtons from '../../../layouts/authentication/sign-in/components/signinMethodButtons'
import UserContext from '../../../userStates/userContext/userContext';
import Appcontext from '../../../States/appContext';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
export default function Default() {
  const navigator = useNavigate();
  const app = useContext(Appcontext);
  const { baseUrl } = app;
  const [showPassword, setShowPassword] = useState({
    field1: false,
    field2: false,
  });

  const handleTogglePassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));

  };
  const signBox = {
    width: {
      xs: '90vw', // For screens < 'sm'
      sm: '80vw', // For screens between 'sm' and 'md'
      md: '70vw',
      lg: '605px', // For screens >= 'md'
    },
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '16px',
    fontFamily: 'Roboto',
    padding:{
      sm:'0px 30px 2% 30px',
      md:'0px 30px 2% 30px',
      lg:'0px 30px 2% 30px',
      xxxl:'2% 60px 4% 60px'
    }
  };
  const boxLogo = {
    position: 'relative',
    height: '5%',
    width: '30%',
    marginTop: '5%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  }
  const loginButton = {
    position: 'relative',
    color: '#2a62ff',
    fontSize: {
      xs: '28px', // For screens < 'sm'
      sm: '28px', // For screens between 'sm' and 'md'
      md: '28px',
      lg: '28px',
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
      xs: '0%', // For screens < 'sm'
      sm: '0%', // For screens between 'sm' and 'md'
      md: '0%',
      lg: '0%',
      xxxl:'3%' // For screens >= 'md'
    },
    fontFamily: 'Roboto'
  }
  const inputRef = useRef();
  const [submitted, setSubmitted] = useState({
    "usernameError": false,
    "emailError": false,
    "emailValidationError": false,
    "emailIncorrectCheck": false,
    "passwordError": false,
    "passwordValidatonError": false,
    "confirmPasswordError": false,
    "confirmPasswordCheck": false
  });
  const [userData, setUserData] = useState({
    "email": "",
    "password": "",
    "username": "",
    "confirmPassword": ""
  })
  const [disableButton, setDisableButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
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
    if (userData.username === '') {
      setSubmitted((prevState) => ({ ...prevState, usernameError: true }));
      setDisableButton(false);
      setIsLoading(false)
      hasError = true;
    } else {
      setSubmitted((prevState) => ({ ...prevState, usernameError: false }));
    }
    if (userData.password === '') {
      setSubmitted((prevState) => ({ ...prevState, passwordError: true }));
      setDisableButton(false);
      setIsLoading(false)
      hasError = true;
    } else if (userData.password.length < 5) {
      setSubmitted((prevState) => ({ ...prevState, passwordValidatonError: true }));
      setDisableButton(false);
      setIsLoading(false)
      hasError = true;
    } else {
      setSubmitted((prevState) => ({ ...prevState, passwordValidatonError: false, passwordError: false }));
    }

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

    if (userData.confirmPassword === '') {
      setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: true }));
      setDisableButton(false);
      setIsLoading(false)
      hasError = true;
    } else if (userData.confirmPassword !== userData.password) {
      setSubmitted((prevState) => ({ ...prevState, confirmPasswordError: true }));
      setDisableButton(false);
      setIsLoading(false)
      hasError = true;
    } else {
      setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: false, confirmPasswordError: false }));
    }

    if (!hasError) {
      await fetch(`${baseUrl}user/create-user`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          user_name: userData.username
        })
      }).then(res => res.json()).then(response => {
        if (response.status === true) {
          setUser(response.findUsers);
          localStorage.setItem('token', response.jwt_token);
          localStorage.setItem('user_id', response.findUsers.user_id);
          localStorage.setItem('name', response.findUsers.user_name);
          toast.success('Sign up Sucessfull', {
            position: toast.POSITION.TOP_CENTER,
          });
          setDisableButton(false);
          setIsLoading(false)
          navigator("/dashboard")
        }
        else {
          if (response.message === 'User registeration failed because email already exsists') {
            setSubmitted((prevState) => ({ ...prevState, emailIncorrectCheck: true }));
            setDisableButton(false);
            setIsLoading(false)
          }
          else {
            setSubmitted((prevState) => ({ ...prevState, emailIncorrectCheck: true }));
            setDisableButton(false);
            setIsLoading(false)
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
          <center><Typography sx={loginButton}>Sign Up</Typography></center>
          <center><Box>
            <form onSubmit={handleFormSubmit} style={{ m: 1, width: '80%' }}>
              <div style={{ "position": "relative", "height": "60px" }}>
                <input onClick={() => {
                  setSubmitted((prevState) => ({ ...prevState, usernameError: false }));
                }} onChange={handleInputChange} value={userData.username} name='username'
                  className={`${submitted.usernameError ? 'signin-input-error' : 'signin-input'}`}
                  placeholder='Username' label="Outlined" type='text' />
                <p className={`${submitted.usernameError ? 'error-text-signup' : 'hidden-text'}`}>
                  {submitted.usernameError ? 'Username is required' : ''}
                </p>
              </div>
              <div style={{ "position": "relative", "height": "60px" }}>
                <input onClick={() => {
                  setSubmitted((prevState) => ({ ...prevState, emailIncorrectCheck: false, emailValidationError: false, emailError: false }));
                }} onChange={handleInputChange} value={userData.email} name='email'
                  className={`${submitted.emailError || submitted.emailValidationError || submitted.emailIncorrectCheck ? 'signin-input-error' : 'signin-input'}`}
                  placeholder='Email' label="Outlined" type='text' />
                <p className={`${submitted.emailError || submitted.emailValidationError || submitted.emailIncorrectCheck ? 'error-text-signup' : 'hidden-text'}`}>
                  {submitted.emailError ? 'Email is required' : submitted.emailValidationError ? 'Enter a Valid Email' : submitted.emailIncorrectCheck ? 'Email already exsists' : ''}
                </p>
              </div>
              <div style={{ "position": "relative", "height": "60px" }}>
                {showPassword.field1 ? (
                  <IoEyeOffOutline className="eyeiconinput" onClick={() => { handleTogglePassword('field1') }} />
                ) : (
                  <IoEyeOutline className="eyeiconinput" onClick={() => { handleTogglePassword('field1') }} />
                )}
                <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, passwordIncorrectCheck: false, passwordValidatonError: false, passwordError: false })); }} onChange={handleInputChange} value={userData.password} name='password'
                  className={`${submitted.passwordError || submitted.passwordValidatonError || submitted.passwordIncorrectCheck ? 'signin-input-error' : 'signin-input'}`}
                  placeholder='Password' label="Outlined" type={showPassword.field1 ? 'text':'password'} />
                <p className={`${submitted.passwordError || submitted.passwordValidatonError || submitted.passwordIncorrectCheck ? 'error-text-signup' : 'hidden-text'}`}>
                  {submitted.passwordError ? 'Password is required' : submitted.passwordValidatonError ? 'Password should be greater then 5 characters'
                    : ''}</p>
              </div>
              
              <div style={{ "position": "relative", "height": "60px" }}>
                {showPassword.field2 ? (
                  <IoEyeOffOutline className="eyeiconinput" onClick={() => { handleTogglePassword('field2') }} />
                ) : (
                  <IoEyeOutline className="eyeiconinput" onClick={() => { handleTogglePassword('field2') }} />
                )}
                <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: false, confirmPasswordError: false })); }} onChange={handleInputChange}
                  value={userData.confirmPassword} name='confirmPassword'
                  className={`${submitted.confirmPasswordError || submitted.confirmPasswordCheck ? 'signin-input-error' : 'signin-input'}`}
                  placeholder='Confirm Password' label="Outlined" type={showPassword.field2 ? 'text':'password'} />
                <p className={`${submitted.confirmPasswordError || submitted.confirmPasswordCheck ? 'error-text-signup' : 'hidden-text'}`}>
                  {submitted.confirmPasswordError ? 'Confirm Password should match password' : submitted.confirmPasswordCheck ? 'Confirm Password should is required'
                    : ''}</p>
              </div>
              <OrSeperator />
              <SigninMethodButtons google="Sign up with google" linkedin="Sign up with linkedin" />
         
              <center><Button
                disabled={disableButton}
                style={{
                  color: 'white',
                  backgroundColor: '#ffb400',
                  width: '90%',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop:'40px',
                  height: '35px',
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
                  'Sign Up'
                )}
              </Button></center>
              <Box marginTop={'2%'}><Typography fontSize={'16px'}>Already have an acount? <Link to='/login' style={{ "color": "#2A62FF", fontWeight: '600', textDecoration:'none' }}>Sign In</Link> </Typography></Box>
            </form>

          </Box></center>
        </Box>
      </Box>

    </Box>
  )
}
