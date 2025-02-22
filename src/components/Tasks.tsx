import React, { useState, useEffect } from 'react';
import TaskElement from './TaskElement';
import { supabase } from '@src/utils/supabase/supabase';
import { fetchDailyTasks } from '@src/lib/lib';

interface tasksProps {
    title: string;
    description: string;
    isChecked: boolean;
    contextualTips: string[];
}

const Tasks = () => {
    const [tasks, setTasks] = useState<tasksProps[] | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storedTasks = localStorage.getItem('dailyTasks');
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks));
                } else {
                    const response = await fetchDailyTasks("2");
                    let cleanJson = response.slice(7, -4);
                    cleanJson = JSON.parse(cleanJson);
                    
                    localStorage.setItem('dailyTasks', JSON.stringify(cleanJson));
                    //@ts-expect-error cleanJson type string not supported
                    setTasks(cleanJson);
                }
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        };

        loadTasks();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const data = await supabase.auth.getUser();
            console.log("User data:", data);
        };

        getUser();
    }, []);

    return (
        <div className='h-full flex flex-col gap-3 mb-5'>
            {tasks?.map((task, index) => (
                <TaskElement 
                    key={index} 
                    title={task.title} 
                    description={task.description} 
                    isChecked={task.isChecked} 
                    contextualTips={task.contextualTips} 
                />
            ))}
        </div>
    );
};

export default Tasks;
