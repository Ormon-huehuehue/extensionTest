import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchGeminiSuggestion } from '@src/lib/lib';
import Topbar from '@src/components/Topbar';
import {RecoilRoot, useRecoilState} from "recoil"
import Navbar from '@src/components/Navbar';
import { panel, panelStateAtom } from '@src/state/atoms';


export default function Popup() {
 
  const [selectedPanel, setSelectedPanel] = useRecoilState<panel>(panelStateAtom);


  return (
    <RecoilRoot>
    <div className= ' flex flex-col'>

      <div className="w-full h-full text-center text-black  justify-center items-center ">
        <Topbar/>
        <div className= 'py-5 flex justify-center'>
          <Navbar/>
        </div>
      </div>
    </div>
    </RecoilRoot>
  );
}

