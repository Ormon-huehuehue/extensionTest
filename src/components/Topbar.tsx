import React from 'react'
import logo from "../assets/img/extension-logo.png"
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className= 'w-screen flex justify-between py-1 px-5 border-b-2 border-[#efefef] '>
        <Link to="/" className="px-4 py-2 text-white rounded">
        <div className= 'flex '>
            <img src= {logo} alt="" width={40} height={40}/>
        </div>
        </Link>
        <div className= 'flex items-center justify-center text-center hover:cursor-pointer'>
            <VscAccount size={25} />
        </div>
    </div>
  )
}

export default Topbar