import React, { useState } from 'react'
import { Box, Button, Grid, Icon, Typography } from '@mui/material'
import CircularProgress from '@material-ui/core/CircularProgress';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

export default function Default(props) {
    const { disableButton, isLoading, setChangePassword, setSubmitted, submitted, passwordData, handlePasswordChange, handlePasswordSubmit } = props;
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
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color for the overlay
            zIndex: 111,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '16px'
        }}>
            <Box style={{

                width: '600px',
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '16px',
                padding: '25px 25px 50px 25px'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '30px', color: '#2a62ff', fontWeight: '500', marginBottom: '50px' }} fontFamily={'Roboto'}>Change Password</Typography>
                    <Typography onClick={() => { setChangePassword(false); }} sx={{ cursor: 'pointer', fontSize: '30px', color: 'black', fontWeight: '500', marginBottom: '50px' }} fontFamily={'Poppins'}>X</Typography>
                </Box>
                <form onSubmit={handlePasswordSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={0} sm={0} md={2} lg={2}>
                        </Grid>
                        <Grid item xs={10} sm={10} md={8} lg={8}>
                            <Box position={'relative'}>
                            {showPassword.field1 ? (
                                    <IoEyeOffOutline className="eyeicon" onClick={()=>{handleTogglePassword('field1')}} />
                                ) : (
                                    <IoEyeOutline className="eyeicon" onClick={()=>{handleTogglePassword('field1')}} />
                                )}
                                <input onClick={() => {
                                    setSubmitted((prevState) => ({ ...prevState, current_password_Error: false }));
                                }} onChange={handlePasswordChange} value={passwordData.current_passworddsf} name='current_password'
                                    className={`${submitted.current_password_Error ? 'account-input-error' : 'account-input'}`}
                                    placeholder='Current Password' label="Outlined" type={showPassword.field1 ? 'text':'password'} />
                                <p className={`${submitted.current_password_Error ? 'account-error-text' : 'account-hidden-text'}`}>
                                    {submitted.current_password_Error ? 'Current Password is required' : ''}
                                </p>
                            
                            </Box>
                        </Grid>
                        <Grid item xs={0} sm={1} md={2} lg={2}>

                        </Grid>
                        <Grid item xs={0} sm={0} md={2} lg={2}>

                        </Grid>
                        <Grid item xs={10} sm={10} md={8} lg={8}>
                        <Box position={'relative'}>
                        {showPassword.field2 ? (
                                    <IoEyeOffOutline className="eyeicon" onClick={()=>{handleTogglePassword('field2')}} />
                                ) : (
                                    <IoEyeOutline className="eyeicon" onClick={()=>{handleTogglePassword('field2')}} />
                                )}
                            <input onClick={() => {
                                setSubmitted((prevState) => ({ ...prevState, passwordError: false, passwordValidate: false }));
                            }} onChange={handlePasswordChange} value={passwordData.password} name='password'
                                className={`${submitted.passwordError || submitted.passwordValidate ? 'account-input-error' : 'account-input'}`}
                                placeholder='New Password' label="Outlined" type={showPassword.field2 ? 'text':'password'} />
                            <p className={`${submitted.passwordError || submitted.passwordValidate ? 'account-error-text' : 'account-hidden-text'}`}>
                                {submitted.passwordError ? 'New Password is required' : submitted.passwordValidate ? 'Password should be of atleast 5 characters' : ''}
                            </p>
                        </Box>
                        </Grid>
                        <Grid item xs={0} sm={1} md={2} lg={2}>

                        </Grid>
                        <Grid item xs={0} sm={0} md={2} lg={2}>

                        </Grid>
                        <Grid item xs={10} sm={10} md={8} lg={8}>
                        <Box position={'relative'}>
                        {showPassword.field3 ? (
                                    <IoEyeOffOutline className="eyeicon" onClick={()=>{handleTogglePassword('field3')}} />
                                ) : (
                                    <IoEyeOutline className="eyeicon" onClick={()=>{handleTogglePassword('field3')}} />
                                )}
                            <input onClick={() => {
                                setSubmitted((prevState) => ({ ...prevState, CpasswordError: false, CpasswordValidate: false }));
                            }} onChange={handlePasswordChange} value={passwordData.cofirmPassword} name='cofirmPassword'
                                className={`${submitted.CpasswordError || submitted.CpasswordValidate ? 'account-input-error' : 'account-input'}`}
                                placeholder='Confirm Password' label="Outlined"  type={showPassword.field3 ? 'text':'password'} />
                            <p className={`${submitted.CpasswordError || submitted.CpasswordValidate ? 'account-error-text' : 'account-hidden-text'}`}>
                                {submitted.CpasswordError ? 'Please Re-Enter the password' : submitted.CpasswordValidate ? 'Password and Confirm password should match' : ''}
                            </p>
                        </Box>
                        </Grid>
                        <Grid item xs={0} sm={1} md={2} lg={2}>

                        </Grid>
                        <Grid item xs={0} sm={1} md={2.3} lg={2.3}>

                        </Grid>
                        <Grid item xs={10} sm={10} md={8} lg={8}>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Button
                                    disabled={disableButton}
                                    style={{
                                        color: 'white',
                                        backgroundColor: '#ffb400',
                                        width: '30%',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        position: 'relative', // Add this to allow absolute positioning of the loader
                                    }}
                                    type='submit'
                                    variant='contained'
                                    onClick={() => { setChangePassword(false); }}
                                >

                                    Cancel

                                </Button>
                                <Button
                                    disabled={disableButton}
                                    style={{
                                        color: 'white',
                                        backgroundColor: '#ffb400',
                                        width: '30%',
                                        fontSize: '16px',
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
                                        'Change'
                                    )}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </div>
    )
}
