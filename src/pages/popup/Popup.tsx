import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Topbar from '@src/components/Topbar';
import Navbar from '@src/components/Navbar';
import browser from 'webextension-polyfill';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";


export default function Popup() {
 
  // const [selectedPanel, setSelectedPanel] = useRecoilState<panel>(panelStateAtom);
  const [apiKeyPresent, setApiKeyPresent] = useState<boolean>(false);
 

  useEffect(()=>{
    const checkApiKey = async()=>{
      const apiKey = await (async () => {
        const data = await browser.storage.local.get("GEMINI_API_KEY");
        return data.GEMINI_API_KEY || null;
      })();

      if (!apiKey) {
          return false;
      }
      return true;
    }

    checkApiKey().then((res)=>{
      setApiKeyPresent(res);
    })
    

  })


  return (

    <Router>
    <div className= ' flex flex-col'>
      <div className="w-full h-full text-center text-black  justify-center items-center ">
        <Topbar/>
        <div className= 'py-5 flex justify-center'>
          <Navbar/>
        </div>
      </div>
    </div>
    </Router>
  
  );
}

