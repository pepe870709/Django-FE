import React from 'react'
import { useContext, createContext } from 'react'
import { useState } from 'react';
import { is } from 'zod/locales';
import { useNavigate } from 'react-router-dom';

const MyContext = createContext();

const ContextModal = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [banner, setBanner] = useState(0);

    const navigate = useNavigate();

    const closeModal = (success) => {
        setIsOpen(false);
        if(success === 1){
          navigate('/')
        }
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const setBannerShow = (num) => {
      setBanner(num);
    }

  return (
    <MyContext.Provider value={{isOpen, closeModal, openModal, setBannerShow, banner}}>
      {children}
    </MyContext.Provider>
  )
}

export default ContextModal

export const useContextModal = () => {
    return useContext(MyContext);
}

