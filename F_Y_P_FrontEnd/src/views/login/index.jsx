import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import p1 from '../../assets/images/undraw_access_account_re_8spm.svg'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigator = useNavigate()
  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    // Check if there are any validation errors before submitting the form
    if (!emailError && !passwordError) {
      // Create a data object to hold the form field values
      // const formData = {
      //   email,
      //   password,
      // };
      await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setEmail("");
            setPassword("");

            
            console.log(response)
            localStorage.setItem('_id',response.result._id)
            localStorage.setItem('name',response.result.fullName)
            localStorage.setItem('email',response.result.email)
            localStorage.setItem('phoneNo',response.result.phoneNo)
            navigator("/LetterDashboard");
            window.location.reload()
          } else {
            alert(response.message)
          }
        });
      // Reset the form fields if needed
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
    }
  };

return (
  <div className="flex h-screen p-20">
  <div className='w-full bg-lime-200 lg:w-1/2 flex items-center rounded-2xl shadow-xl justify-center'>
    <div className="max-w-md w-full p-6">
    <h1 class="text-3xl font-semibold mb-6 text-black text-center">Welcome Back!</h1>
    <form
    className=''
    onSubmit={handleSubmit}
    >

      {/* Email input field */}
      <div className='mb-4'>
        <label htmlFor="email" className='block text-black-400'>Email:</label>
        <input
          id="email"
          type="text"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
        />
        <span className='text-red-500'>{emailError}</span>
      </div>

      {/* Password input field */}
      <div className='mb-4'>
        <label htmlFor="password" className='block text-black-400'>Password:</label>
        <input
          id="password"
          type="password"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
        />
        <span className='text-red-500'>{passwordError}</span>
      </div>

      {/* Submit button */}
      <button
      type="submit"
      className="w-full bg-teal-500 text-white p-2 rounded-md hover:bg-emerald-700 focus:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
        Login
      </button>

      <div className="mt-4 text-sm text-gray-600 text-center">
        Dont have Account? <button onClick={() => {
                localStorage.clear()
                navigator(`/Signup`)
              }}>SignUp</button>
      </div>
    </form>
   </div>
  </div>
  <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
      <div className="max-w-md text-center">
      <img src={p1} alt="" />
      </div>
    </div>
   </div>
  );
}