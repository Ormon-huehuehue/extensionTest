import React from 'react'
import logo from "../assets/img/extension-logo.png"
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className= 'w-screen flex justify-between py-1 px-5 border-b-2 border-grayBorder '>
        <Link to="/" className="px-4 py-2 ">
        <div className= 'flex '>
            <img src= {logo} alt="" width={40} height={40}/>
        </div>
        </Link>
        <div className= 'flex items-center justify-center text-center hover:cursor-pointer'>
        <Link to="/settings" className="px-4 py-2">
            <VscAccount size={25} />
        </Link>
        </div>
    </div>
  )
}

export default Topbar