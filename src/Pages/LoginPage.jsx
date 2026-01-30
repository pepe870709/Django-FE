import React from 'react'
import LoginForm from '../Components/LoginForm'
import { Link } from 'react-router-dom'
import GoogleLogin from '../Components/GoogleLogin'
import { useEffect } from 'react'
import { useContextModal } from '../Context-API/ContextModal.jsx'
import Modal from '../Components/Modal/Modal.jsx'

const LoginPage = () => {

  const {isOpen, closeModal, openModal, setBannerShow, banner} = useContextModal();
  
  useEffect(() => {
    setBannerShow(0);
  }, [])

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => closeModal(banner)} >
          {(banner === 2) && <div className="text-red-500">There was an error during Sign In. Please try again.</div>}
          {(banner === 1) && <div className="text-green-500">Signed In Successfully! Redirecting...</div>}
      </Modal>
      <LoginForm/>
      <GoogleLogin/>
    </div>
  )
}

export default LoginPage
