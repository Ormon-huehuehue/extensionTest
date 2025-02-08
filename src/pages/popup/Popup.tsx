import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchGeminiSuggestion } from '@src/lib/lib';
import Topbar from '@src/components/Topbar';

export default function Popup() {
 



  return (
    <div className="w-full h-full text-center text-black  justify-center items-center ">
      <Topbar/>
      <div className= ''>
        Heyyy
      </div>
      
    </div>
  );
}

