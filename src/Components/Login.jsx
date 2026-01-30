import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="flex justify-end text-white bg-gray-400 py-4" style={{height:'40px', padding:'0px', margin:'0px'}}>
            
                
                    <ul className="flex items-center menu menu-horizontal py-4" style={{margin:'0px', padding:'0px'}}>
                        <li style={{margin:'0px', padding:'0px'}}>
                            <Link to='/login'>Sign In</Link>
                        </li>
                        <li style={{margin:'0px', padding:'0px'}}>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                    </ul>
               
            <div className="flex gap-2">
            
            
            <div className="dropdown dropdown-end">

                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Login
