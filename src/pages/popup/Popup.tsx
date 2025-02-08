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




export default function Popup() {
  const [apiKeyPresent, setApiKeyPresent] = useState<boolean>(false);

  useEffect(() => {
    const checkApiKey = async () => {
      const data = await browser.storage.local.get("GEMINI_API_KEY");
      return data.GEMINI_API_KEY ? true : false;
    };

    checkApiKey().then(setApiKeyPresent);
  }, []); // Added dependency array to avoid infinite loop


  return (
    <Router>
      <div className="flex flex-col">
        <div className="w-full h-full text-center text-black justify-center items-center">
          <Topbar />
          <div className="py-5 flex justify-center">
            <Navbar />
          </div>    
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} /> 
            <Route path="/insights" element={<Insights />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
