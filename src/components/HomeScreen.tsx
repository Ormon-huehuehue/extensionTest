import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Tasks from './Tasks';
import Insights from './Insights';
import Connections from './Connections';

type panelType = "Tasks" | "Insights" | "Connections";

const HomeScreen = () => {

    const {panel} = useParams();

    // const [activePanel, setActivePanel] = useState(panel);
    
    // useEffect(()=>{
    //     const {panel} = useParams();
    //     console.log("Panel :", panel)
    //     setActivePanel(panel as panelType);
    // }, [panel])


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