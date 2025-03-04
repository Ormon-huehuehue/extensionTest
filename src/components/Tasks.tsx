import React, { useState, useEffect } from 'react';
import TaskElement from './TaskElement';
import { supabase } from '@src/utils/supabase/supabase';
import { fetchDailyTasks } from '@src/lib/lib';
import { useNavigate } from 'react-router-dom';

interface tasksProps {
    title: string;
    description: string;
    isChecked: boolean;
    contextualTips: string[];
}

const Tasks = () => {
    const [tasks, setTasks] = useState<tasksProps[] | null>(null);
    const [userLevel, setUserLevel] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const getUser = async () => {
            const {data, error : authError} = await supabase.auth.getUser();
            if(authError){
                console.error("Error fetching user data:", authError);
                return;
            }

            const userLevel = localStorage.getItem("userLevel");
            setUserLevel(userLevel);

            try{
                const { data: userData, error } = await supabase
                .from('users-data')
                .select('userLevel, email')
                .eq('email', data.user?.email);
                
                if (error) {
                    console.error("Error fetching user level:", error);
                    navigate("/onboarding-survey");
                } else {
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
                console.error("Check Gemini API key")
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
