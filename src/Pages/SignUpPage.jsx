import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../Components/LoginForm'
import GoogleLogin from '../Components/GoogleLogin'
import SignUpForm from '../Components/SignUpForm'

export default function SignUpPage() {
  return (
    <div>
      <SignUpForm/>
      <GoogleLogin/>
    </div>
  )
}