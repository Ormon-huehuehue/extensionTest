import React from 'react'
import TaskElement from './TaskElement'

const tasks = [
    {
        title : "Engage with your network",
        description : "Prioritize quality interactions with key connections and potential clients. Write thoughtful comments that demonstrate your expertise and offer value. Don't just say 'Great post!'",
        isChecked : false
    },
    {
        title : "Create/Curate and promote content",
        description : "Prioritize blabla",
        isChecked : false
    },
    {
        title : "Nurture and Engage",
        description : "Prioritize blabla",
        isChecked : false
    }
]


const Tasks = () => {



  return (
    <div className=  'h-full flex flex-col gap-3 mb-5'>
        {tasks.map((task)=>(
            <div className=''>
                <TaskElement title={task.title} description={task.description} isChecked={task.isChecked}/>
            </div>
        ))}
        
    </div>
  )
}

export default Tasks