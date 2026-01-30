import React, { useEffect } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInUserValidationSchema, type SignInUserValidationSchema } from '../Schema/userValidation';

import { useSignInFetch } from '../hook/reactQueryFetch';

import { useContextModal } from '../Context-API/ContextModal';

const LoginForm = () => {

  const {login, isLoading, isError, isSuccess} = useSignInFetch()
  const [remember, setRememeber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //const [isOpen, setIsOpen] = useState(false);
  const {isOpen, closeModal, openModal, setBannerShow, banner} = useContextModal();

  const { register, handleSubmit, reset,formState: { errors, isSubmitSuccessful } } = useForm<SignInUserValidationSchema>({
    resolver: zodResolver(signInUserValidationSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if(isSuccess && isSubmitSuccessful){
      setBannerShow(1);
      openModal();
    }else if(isError && isSubmitSuccessful){
      setBannerShow(2);
    }
    }, [isSuccess, isError, isSubmitSuccessful, errors]);

  const handleLogin = (data: SignInUserValidationSchema) => {
    const email = data.email;
    const password = data.password;
    // Handle login logic here, e.g., API call
    login({ email, password, remember });
    reset();
  }


  return (
    <div>
      
      
    {(banner === 1) && 
      <div className="alert alert-success shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Signed In Successfully!</span>
        </div>
      </div>
      }
      {
        (banner === 2) && 
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>There was an error during Sign In. Please try again.</span>
          </div>
        </div>
      }
      
      


    <div className='flex justify-center pt-26'>
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" onSubmit={handleSubmit(handleLogin)}>
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            {/* Hidden input to set the type to 'signin' */}
            <input type="hidden" value="signin" {...register("type")} /> 

            

            <input {...register("email")} className="input" placeholder="Email"/>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            <label className="label grow">Password</label>
            
            <div className='flex items-center gap-2'>
                <input {...register("password")} type={showPassword?"input":"password"} className="input" placeholder="Password"/>
                <button type='button' onClick={() => {togglePasswordVisibility()}}>{showPassword?<FiEyeOff/>:<FiEye/>}</button>
            </div>
            <div>
                <input {...register("remember")} type="checkbox" onClick={()=>{setRememeber(!remember); }}/>
                <label className="label">.     Remember me</label> 
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            <button className="btn btn-neutral mt-4" type="submit">Login</button>

        </form>
    </div>
  </div>
  )
}

export default LoginForm
