import React, { useEffect, useState } from 'react'
import logo from "../assets/img/extension-logo.png"
import { VscAccount } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from '@src/utils/supabase/supabase';

const Topbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUser(); // Check user on component mount

    // Set up message event listener
    const handleMessage = (event : MessageEvent) => {
      if (event.data === 'checkUser') { 
        checkUser();
      }
      if(event.data === "addComment"){
        console.log("Add comment")
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);


  const location = useLocation();
  const method = location.pathname.split("/")[2]; // Extracts "login" or "signup"



  return (
    <div className= 'w-screen flex justify-between py-1 px-5 border-b-2 border-grayBorder '>
      {isLoggedIn ? 
      <Link to="/home/Tasks" className="px-4 py-2 ">
      <div className= 'flex '>
          <img src= {logo} alt="" width={40} height={40}/>
      </div>
      </Link> : 
      <div className= 'flex '>
        <img src= {logo} alt="" width={40} height={40}/>
      </div>
      }
        
        <div className= 'flex items-center justify-center text-center hover:cursor-pointer'>
        {isLoggedIn ? (
          <Link to="/settings" className="px-4 py-2">
            <VscAccount size={25} />
          </Link>
        ) : (
        <>
        {method == "login" ?
          <Link to="/account/signup" className="px-4 py-2 text-black">
              <p className='text-lg'>Sign up</p>
          </Link>  : 
          <Link to="/account/login" className="px-4 py-2 text-black">
            <p className=" text-lg">Log in</p>
          </Link>}
        </>
        )}

        </div>
    </div>
  )
}

export default Topbar