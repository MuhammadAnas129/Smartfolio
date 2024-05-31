import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import '../../index.css'
export default function Default(props) {
  const { setSubmitted, handleInputChange, userData, submitted } = props
  const [showPassword, setShowPassword] = useState({
    field1:false,
    field2:false,
    field3:false,
});

const handleTogglePassword = (field) => {
    setShowPassword((prevState) => ({
        ...prevState,
        [field]: !prevState[field],
      }));
  
};
  return (
    <>
      <div style={{ "position": "relative", "height": "50px" }}>

        <input onClick={() => {
          setSubmitted((prevState) => ({ ...prevState, emailIncorrectCheck: false, emailValidationError: false, emailError: false }));
        }} onChange={handleInputChange} value={userData.email} name='email'
          className={`${submitted.emailError || submitted.emailValidationError || submitted.emailIncorrectCheck ? 'signin-input-error' : 'signin-input'}`}
          placeholder='Email' label="Outlined" type='text' />
        <p className={`${submitted.emailError || submitted.emailValidationError || submitted.emailIncorrectCheck ? 'error-text' : 'hidden-text'}`}>
          {submitted.emailError ? 'Email is required' : submitted.emailValidationError ? 'Enter a Valid Email' : submitted.emailIncorrectCheck ? 'Email does not exsists' : ''}
        </p>
      </div>
      <br />
      <div style={{ "position": "relative", "height": "50px" }}>
        {showPassword.field1 ? (
          <IoEyeOffOutline className="eyeiconinput" onClick={() => { handleTogglePassword('field1') }} />
        ) : (
          <IoEyeOutline className="eyeiconinput" onClick={() => { handleTogglePassword('field1') }} />
        )}
        <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, passwordIncorrectCheck: false, passwordValidatonError: false, passwordError: false })); }} onChange={handleInputChange} value={userData.password} name='password'
          className={`${submitted.passwordError || submitted.passwordValidatonError || submitted.passwordIncorrectCheck ? 'signin-input-error' : 'signin-input'}`}
          placeholder='Password' label="Outlined" type={showPassword.field1 ? 'text':'password'} />
        <p className={`${submitted.passwordError || submitted.passwordValidatonError || submitted.passwordIncorrectCheck ? 'error-text' : 'hidden-text'}`}>
          {submitted.passwordError ? 'Password is required' : submitted.passwordValidatonError ? 'Password should be greater then 5 characters'
            : submitted.passwordIncorrectCheck ? "Incorrect email or password entered" : ''}</p>
        <Link to='/forget-password'><Button style={{ "float": "right", "color": "#2a62ff" }}>Forget Password?</Button></Link>
      </div>
    </>
  )
}
