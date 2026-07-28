import React from 'react'
import WelcomeBack from './COMPONENTS/WelcomeBack'
import SignInForm from './COMPONENTS/SignIn-Form'

const SignIn = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row dark:bg-neutral-950">
      {/* Left: Welcome back section */}
      <WelcomeBack/>

      {/* Right: Sign in form */}
      <SignInForm/>
    </div>
  )
}

export default SignIn