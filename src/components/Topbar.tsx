import React from 'react'
import logo from "../assets/img/extension-logo.png"
import { VscAccount } from "react-icons/vsc";

const Topbar = () => {
  return (
    <div className= 'w-screen flex justify-between py-1 px-5 border-b-2 border-[#efefef]'>
        <div className= 'flex '>
            <img src= {logo} alt="" width={40} height={40}/>
        </div>
        <div className= 'flex items-center justify-center text-center'>
            <VscAccount size={25} />
        </div>
    </div>
  )
}

export default Topbar