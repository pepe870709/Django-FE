import React from 'react'
//import SignUpPage from './Pages/SignUpPage'
import {Routes, Route, createBrowserRouter} from 'react-router-dom'
//import Home from './Pages/Home'

import './App.css'
//import LoginPage from './Pages/LoginPage'
import ContextModal from './Context-API/ContextModal.jsx'
import { RouterProvider } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import {Home, About, Cart, Checkout, Error, LoginPage, Landing, SingleProduct, SignUpPage, Orders, Products} from './Pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
          <ContextModal>
            <Home />
          </ContextModal>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true, 
        element: <Landing />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'products/:id',
        element: <SingleProduct />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'signup',
        element: <SignUpPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'orders',
        element: <Orders />
      },
    ],
  },
  {
    path: '/error',
    element: <Error />,
    errorElement: <Error />,
  },
])

function App() {
  return (    
      <RouterProvider router={router} />
    // <ContextModal> 
    //   <Routes>
    //     <Route path='/' element={<Home/>}/>
    //     <Route path='/login' element={<LoginPage/>}/>
    //     <Route path='/signup' element={<SignUpPage/>}/>
    //   </Routes>
    // </ContextModal>
  )
}

export default App
