import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Tasks from './Tasks';
import Insights from './Insights';
import Connections from './Connections';
import { supabase } from '@src/utils/supabase/supabase';

type panelType = "Tasks" | "Insights" | "Connections";

const HomeScreen = () => {

  const {panel} = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setIsLoggedIn(true);
        }
        else{
          navigate("/account/login");
        }
        
      };
      checkUser();
    }, []);


  return (
    <div className='w-full h-full text-center text-black justify-center items-center '>
        <div className="py-5 flex justify-center">
            <Navbar />
        </div>  
        {panel == "Tasks" && <div><Tasks/></div>}
        {panel == "Insights" && <div><Insights/></div>}
        {panel == "Connections" && <div><Connections/></div>}
    </div>
  )
}

export default HomeScreen