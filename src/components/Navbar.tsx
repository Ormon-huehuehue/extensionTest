import React, {useState} from 'react'
import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Tasks from './Tasks';
import Insights from './Insights';
import Connections from './Connections';
import Popup from '@src/pages/popup/Popup';

type panelType = "Tasks" | "Insights" | "Connections";

const Navbar = () => {

  const [selected, setSelected] = useState<panelType>("Tasks");

  const handleClick = (panel : panelType)=>{
    setSelected(panel);
  }

  return (

    <div className= 'w-[80%] flex py-2 px-3 text-[#787878] justify-around border-2 border-[#efefef] bg-[#f9fbfc] rounded-xl'>
        {/* Navigation Links */}
        <div className="flex gap-4 justify-center items-center w-full">
            <Link to="/insights" className={`py-2 w-1/3 ${selected == "Insights" ? "bg-[#ffffff] border-1 border-[#efefef] shadow-sm" : "bg-transparent"}  rounded `} 
            onClick ={()=> handleClick("Insights")}>Insights</Link>
            <Link to="/tasks" className={` py-2 w-1/3 ${selected == "Tasks" ?  "bg-[#ffffff] border-1 border-[#efefef] shadow-sm" : "bg-transparent"}  rounded `}
            onClick ={()=> handleClick("Tasks")}>Tasks</Link>
            <Link to="/connections" className={`py-2 w-1/3  ${selected == "Connections" ?  "bg-[#ffffff] border-1 border-[#efefef] shadow-sm" : "bg-transparent"}  rounded`}
            onClick ={()=> handleClick("Connections")}>Connections</Link>
          </div>
    </div>
  )
}

export default Navbar