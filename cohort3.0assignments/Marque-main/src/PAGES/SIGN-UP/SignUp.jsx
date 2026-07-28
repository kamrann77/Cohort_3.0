import React from 'react'
import Logo from '../../components/Logo'
import SignUpForm from './SignUp-Form'

const SignUp = () => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-neutral-950'>
            <Logo size="md" className="mb-8" />
            <SignUpForm />
        </div>
    )
}

export default SignUp
