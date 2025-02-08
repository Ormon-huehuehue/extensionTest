import React from 'react'
import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Tasks from './Tasks';
import Insights from './Insights';
import Connections from './Connections';
import Popup from '@src/pages/popup/Popup';


const Navbar = () => {


  return (

    <div className= 'w-[80%] flex py-2 px-3 text-[#1f1f1f] justify-around border-2 border-[#efefef] bg-[#f9fbfc] rounded-xl'>
        {/* Navigation Links */}
        <div className="flex gap-4 justify-center">
            <Link to="/insights" className="px-4 py-2 bg-gray-500 text-white rounded">Insights</Link>
            <Link to="/tasks" className="px-4 py-2 bg-gray-500 text-white rounded">Tasks</Link>
            <Link to="/connections" className="px-4 py-2 bg-gray-500 text-white rounded">Connections</Link>
          </div>
          {/* Routes */}
    </div>
  )
}

export default Navbar