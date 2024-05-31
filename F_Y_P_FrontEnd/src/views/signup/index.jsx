import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import p2 from '../../assets/images/undraw_my_password_re_ydq7.svg'


export default function Signup() {
  // State variables for form fields and error messages
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigator = useNavigate();
  // Validation functions for each form field
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePhone = () => {
    if (!phone) {
      setPhoneError("Phone number is required");
    } else if (!/^\d+$/.test(phone)) {
      setPhoneError("Phone number should only consist of numbers");
    } else {
      setPhoneError("");
    }
  };

  const validateFullName = () => {
    if (!fullName) {
      setFullNameError("Full name is required");
    } else if (fullName.length < 10) {
      setFullNameError("Full name must be at least 10 characters long");
    } else {
      setFullNameError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all form fields
    validateEmail();
    validatePhone();
    validateFullName();
    validatePassword();
    validateConfirmPassword();

    // Check if there are any validation errors before submitting the form
    if (
      !emailError &&
      !phoneError &&
      !fullNameError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          phoneNo:phone,
          fullName:fullName
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setEmail("");
            setPhone("");
            setFullName("");
            setPassword("");
            setConfirmPassword("");
            setEmailError("");
            setPhoneError("");
            setFullNameError("");
            setPasswordError("");
            setConfirmPasswordError("");
            navigator("/Login");

            console.log(response)
            localStorage.setItem('_id',response.result._id)
            localStorage.setItem('name',response.result.fullName)
            localStorage.setItem('email',response.result.email)
            localStorage.setItem('phoneNo',response.result.phoneNo)
          } else {
            alert(response.message)
          }
        });
      // Reset the form fields and error messages
    }
  };

  // Render the form with input fields and error messages
  return (
    <div className="flex h-screen p-20">
    <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black ">
    <div className="max-w-md text-center">
      <img src={p2} alt="" />
    </div>
  </div>

    <div className="w-full bg-lime-200 lg:w-1/2 flex items-center justify-center rounded-2xl shadow-xl">
      <div className="max-w-md w-full p-6">
      <h1 class="text-3xl font-semibold text-black text-center">Sign Up</h1>
      <h1 class="text-sm font-semibold  text-gray-500 text-center">Join to Our Community with all time access and free </h1>
        <form
          className=""
          onSubmit={handleSubmit}
        >

          {/* Email input field */}
          <div className="flex flex-col text-gray-400 py-2">
            {/* <label htmlFor="email">Email:</label> */}
            <input
              id="email"
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            <span className="text-red-500">{emailError}</span>
          </div>

          {/* Phone input field */}
          <div className="flex flex-col text-gray-400 py-2">
            {/* <label htmlFor="phone">Phone No:</label> */}
            <input
              id="phone"
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              placeholder="Enter your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={validatePhone}
            />
            <span className="text-red-500">{phoneError}</span>
          </div>

          {/* Full Name input field */}
          <div className="flex flex-col text-gray-400 py-2">
            {/* <label htmlFor="fullName">Full Name:</label> */}
            <input
              id="fullName"
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              placeholder="Enter your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={validateFullName}
            />
            <span className="text-red-500">{fullNameError}</span>
          </div>

          {/* Password input field */}
          <div className="flex flex-col text-gray-400 py-2">
            {/* <label htmlFor="password">Password:</label> */}
            <input
              id="password"
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
            <span className="text-red-500">{passwordError}</span>
          </div>

          {/* Confirm Password input field */}
          <div className="flex flex-col text-gray-400 py-2">
            {/* <label htmlFor="confirmPassword">Confirm Password:</label> */}
            <input
              id="confirmPassword"
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
            />
            <span className="text-red-500">{confirmPasswordError}</span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-2 rounded-md hover:bg-emerald-700 focus:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"> Sign Up
          </button>
        </form>
        {/* <div class="mt-4 text-sm text-gray-600 text-center">
        <p>Already have an account? <a href="" class="text-black hover:underline">Login here</a>
        </p>
        </div> */}
         <div className="mt-4 text-sm text-gray-600 text-center">
        Already have an Account? <button onClick={() => {
                localStorage.clear()
                navigator(`/login`)
              }}>login</button>
      </div>
      </div>
    </div>
  </div>
  );
}