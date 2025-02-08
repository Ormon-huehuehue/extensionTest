import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchGeminiSuggestion } from '@src/lib/lib';
import Topbar from '@src/components/Topbar';
import Navbar from '@src/components/Navbar';

export default function Popup() {
 



  return (
    <div className="w-full h-full text-center text-black  justify-center items-center ">
      <Topbar/>
      <div className= 'py-5 flex justify-center'>
        <Navbar/>
      </div>
      
    </div>
  );
}

