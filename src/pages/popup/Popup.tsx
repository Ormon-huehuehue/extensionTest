import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import browser from "webextension-polyfill";

import Topbar from "@src/components/Topbar";
import Navbar from "@src/components/Navbar";
import Settings from "../Settings/Settings";
import Task from "@src/components/TaskElement";
import Insights from "@src/components/Insights";
import Tasks from "@src/components/Tasks";
import Connections from "@src/components/Connections";
import LoginScreen from "@src/components/LoginScreen";
import HomeScreen from "@src/components/HomeScreen";
import SignupScreen from "@src/components/SignupScreen";




export default function Popup() {
  const [apiKeyPresent, setApiKeyPresent] = useState<boolean>(false);

  useEffect(() => {
    const checkApiKey = async () => {
      const data = await browser.storage.local.get("GEMINI_API_KEY");
      return data.GEMINI_API_KEY ? true : false;
    };

    checkApiKey().then(setApiKeyPresent);
  }, []); 


  return (
    <Router>
      <div >
        <div className="w-full h-full text-center text-black justify-center items-center">
          <Topbar />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} /> 
            <Route path = '/home/:panel' element={<HomeScreen/>}/>
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element = {<LoginScreen/>} />
            <Route path="/signup" element = {<SignupScreen/>} />
      </Routes>
    </Router>
  );
}


