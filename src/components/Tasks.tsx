import React, {useState, useEffect} from 'react'
import TaskElement from './TaskElement'
import { supabase } from '@src/utils/supabase/supabase'
import { fetchDailyTasks } from '@src/lib/lib'


interface tasksProps{
    title : string,
    description : string,
    isChecked : boolean ,
    contextualTips : string[]
}


const Tasks = () => {

     
    const [tasks, setTasks] = useState<tasksProps[] | null>(null)


    useEffect(()=>{
        const newTasks = async ()=>{
            const response = await fetchDailyTasks("2");
            let cleanJson = response.slice(7, -4);
            cleanJson = JSON.parse(cleanJson)

            console.log("Clean Json tasks : ", cleanJson)

        }

        newTasks();
    },[])


    useEffect(()=>{
        const getUser = async()=>{
            const data = await supabase.auth.getUser();
            console.log("User data :", data);
        }

        getUser();
    },[])


  return (
    <div className=  'h-full flex flex-col gap-3 mb-5'>
        {tasks?.map((task)=>(
            <div className=''>
                <TaskElement title={task.title} description={task.description} isChecked={task.isChecked} contextualTips={task.contextualTips}/>
            </div>
        ))}
        
    </div>
  )
}

export default Tasks