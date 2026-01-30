import React, { use } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { signUpUserValidationSchema, type SignUpUserValidationSchema } from '../Schema/userValidation';
import { useSignUpFetch } from '../hook/reactQueryFetch';


const SignUpForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  

  const {signUp, isPending, error, isSuccess} = useSignUpFetch()

  const { register, handleSubmit,reset, formState: { errors, isSubmitSuccessful } } = useForm<SignUpUserValidationSchema>({
      resolver: zodResolver(signUpUserValidationSchema),
    });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = (data: SignUpUserValidationSchema) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        signUp({name, email, password});
         // Handle login logic here, e.g., API call 
         reset();
  }
  


  return (
    <div>
      {(!error && isSubmitSuccessful) && 
      <div className="alert alert-success shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Signed Up Successfully!</span>
        </div>
      </div>
      }
      {
        error && 
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>There was an error during Sign Up. Please try again.</span>
          </div>
        </div>
      }
      
      <div className='flex justify-center pt-26'>
            
            <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" onSubmit={handleSubmit(handleSignUp)}>
                <legend className="fieldset-legend">Sign Up</legend>

                <label className="label">Name</label>
                {/* Hidden input to set the type to 'signup' */}
                <input type="hidden" value="signup" {...register("type")} /> 

                <input {...register("name")} className="input" placeholder="Name" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                <label className="label">Email</label>
                <input {...register("email")} className="input" placeholder="Email" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                <label className="label">Password</label>

                  <div className='flex items-center gap-2'>
                    <input {...register("password")} type={showPassword?"input":"password"} className="input" placeholder="Password"/>
                    <button type='button' onClick={() => {togglePasswordVisibility()}}>{showPassword?<FiEyeOff/>:<FiEye/>}</button>
                  </div>
                  
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                <button className="btn btn-neutral mt-4" type='submit'>Sign Up</button>
            </form>
      </div>
    </div>
 
      
  )
}

export default SignUpForm
