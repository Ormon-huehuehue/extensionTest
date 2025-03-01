import React, { useEffect, useState } from "react";
import axios from "axios"

const StatsGrid = () => {
  const [commentsPosted, setCommentsPosted] = useState(0);
  const [postsPublished, setPostsPublished] = useState(0);


  const fetchUserStats = async () =>{
    const linkedInProfileUrl = localStorage.getItem("profileUrl");
    console.log("LinkedIn Profile URL:", linkedInProfileUrl);

    try{
      const userStats = await axios.get("http://localhost:3000/api/user-stats?profileUrl=" + linkedInProfileUrl);
      console.log("User stats:", userStats.data);
      
      return userStats.data;
    }
    catch(error){
      console.error("Error fetching user stats:", error);
      return null;
    }
  }
  

  useEffect(()=>{
    fetchUserStats().then((stats)=>{
      setCommentsPosted(stats.commentsPosted);
      setPostsPublished(stats.postsPublished);
    })
  },[])

  useEffect(() => {
    chrome.storage.local.get(["commentTimestamps"], (result) => {
      const timestamps = result.commentTimestamps || [];
      setCommentsPosted(timestamps.length);
    });

    chrome.storage.local.get(["postTimeStamps"], (result) => {
      const timestamps = result.postTimeStamps || [];
      setPostsPublished(timestamps.length);
    })
  }, []);

  const stats = [
    { value: "23", label: "New Connections" },
    { value: "50", label: "Number of Follow" },
    { value: commentsPosted, label: "Comments Posted" },
    { value: postsPublished, label: "Posts & Articles Published" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 px-4 py-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col justify-end items-start p-4 h-28 border-[#efefef] bg-[#f9fbfc] border rounded-lg shadow-sm"
        >
          <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
          <span className="text-gray-600 text-[10px]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
