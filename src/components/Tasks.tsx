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
    const [userLevel, setUserLevel] = useState<string | null>(null);


    useEffect(() => {
        const getUser = async () => {
            const {data, error : authError} = await supabase.auth.getUser();
            console.log("User data:", data);

            if(authError){
                console.error("Error fetching user data:", authError);
                return;
            }

            setUserLevel(localStorage.getItem("userLevel"));

            try{

                const { data: userData, error } = await supabase
                .from('users-data')
                .select('userLevel, email')
                .eq('email', data.user?.email);
                
                console.log("users-data table :", userData)
                if (error) {
                    console.error("Error fetching user level:", error);
                } else {
                    console.log("User level : ", userData[0].userLevel)
                    console.log("User email : ", userData[0].email);
                    localStorage.setItem('userLevel', userData[0].userLevel);
                    setUserLevel(userData[0].userLevel);
                }
            }
            catch(error){
                console.error("Error fetching user level:", error);
            }
        };

        getUser();
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storedTasks = localStorage.getItem('dailyTasks');
                if (storedTasks) {
                    setTasks(JSON.parse(storedTasks));
                } else {
                    if(userLevel){
                        const response = await fetchDailyTasks(userLevel);
                        let cleanJson = response.slice(7, -4);
                        cleanJson = JSON.parse(cleanJson);
                        
                        localStorage.setItem('dailyTasks', JSON.stringify(cleanJson));
                        //@ts-expect-error cleanJson type string not supported
                        setTasks(cleanJson);
                    }
                }
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        };

        loadTasks();
    }, [userLevel]);

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
