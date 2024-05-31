import { Box, Button, Typography } from '@mui/material';
import React from 'react'
// import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import '../sign-in/index';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function Default(props) {
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
  const { handleResetFormSubmit, setSubmitted, handleInputChange, userData, submitted, isLoading, disableButton } = props;
  return (
    <Box className='auth-main'><Box className='sign-in-secondary'></Box>
      <Box sx={signBox} style={{ "backgroundColor": "white" }}>
        <img style={boxLogo} src={logo} />
        <center><Typography sx={loginButton}>Reset Password</Typography></center><br />
        <center><Box>
          <form onSubmit={handleResetFormSubmit} style={{ m: 1, width: '80%' }}>
            <div style={{ "position": "relative", "height": "80px" }}>
              <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, passwordIncorrectCheck: false, passwordValidatonError: false, passwordError: false })); }} onChange={handleInputChange} value={userData.password} name='password'
                className={`${submitted.passwordError || submitted.passwordValidatonError || submitted.passwordIncorrectCheck ? 'signin-input-error' : 'signin-input'}`}
                placeholder='Password' label="Outlined" type='password' />
              <p className={`${submitted.passwordError || submitted.passwordValidatonError || submitted.passwordIncorrectCheck ? 'error-text' : 'hidden-text'}`}>
                {submitted.passwordError ? 'Password is required' : submitted.passwordValidatonError ? 'Password should be greater then 5 characters'
                  : ''}</p>
            </div>
            <div style={{ "position": "relative", "height": "80px" }}>
              <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: false, confirmPasswordError: false })); }} onChange={handleInputChange}
                value={userData.confirmPassword} name='confirmPassword'
                className={`${submitted.confirmPasswordError || submitted.confirmPasswordCheck ? 'signin-input-error' : 'signin-input'}`}
                placeholder='Confirm Password' label="Outlined" type='password' />
              <p className={`${submitted.confirmPasswordError || submitted.confirmPasswordCheck ? 'error-text' : 'hidden-text'}`}>
                {submitted.confirmPasswordError ? 'Confirm Password should match password' : submitted.confirmPasswordCheck ? 'Confirm Password should is required'
                  : ''}</p>
            </div>
            <br />
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
                'Change Password'
              )}
            </Button></center>
          </form>

        </Box></center>
      </Box>
    </Box>
  )
}
