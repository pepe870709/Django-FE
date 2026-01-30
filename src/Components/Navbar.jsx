import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";


const Navbar = () => {
  return (
    <div data-theme='dark' className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
            <div className="dropdown">    
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><a href='http://localhost:5173/'>Home</a></li>
                <li><a href='http://localhost:5173/about'>About</a></li>
                <li><a href='http://localhost:5173/products'>Product</a></li>
                <li><a href='http://localhost:5173/cart'>Cart</a></li>
                <li><a href='http://localhost:5173/checkout'>Checkout</a></li>
                <li><a href='http://localhost:5173/orders'>Orders</a></li>
            </ul>
            </div>
            <div>
                <a href='http://localhost:5173/' className="btn btn-ghost normal-case text-xl">MicroST</a>
            </div>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li><a href='http://localhost:5173/'>Home</a></li>
                <li><a href='http://localhost:5173/about'>About</a></li>
                <li><a href='http://localhost:5173/products'>Product</a></li>
                <li><a href='http://localhost:5173/cart'>Cart</a></li>
                <li><a href='http://localhost:5173/checkout'>Checkout</a></li>
                <li><a href='http://localhost:5173/orders'>Orders</a></li>
            </ul>
        </div>
        <div className="navbar-end">

            <a className="btn"><FaMoon /></a>
            <a className="btn"><FaShoppingCart /></a>
            
        </div>
    </div>
  )
}

export default Navbar
