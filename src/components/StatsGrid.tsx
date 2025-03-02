import React, { useEffect, useState } from "react";

const StatsGrid = () => {
  const [commentsPosted, setCommentsPosted] = useState(0);
  const [postsPublished, setPostsPublished] = useState(0);
  const [newConnections, setNewConnections] = useState(0);
  const [newFollowers, setNewFollowers] = useState(0);

  useEffect(() => {
    // Fetch comment timestamps
    chrome.storage.local.get(["commentTimestamps"], (result) => {
      const timestamps = result.commentTimestamps || [];
      setCommentsPosted(timestamps.length);
    });

    // Fetch post timestamps
    chrome.storage.local.get(["postTimeStamps"], (result) => {
      const timestamps = result.postTimeStamps || [];
      setPostsPublished(timestamps.length);
    });

    // Fetch connection & follower data
    chrome.storage.local.get(["connectionData"], (result) => {
      const connectionData: { connectionCount: number; followersCount: number; timestamp: string }[] = 
        result.connectionData || [];

      // Sum up all connections & followers
      const totalConnections = connectionData.reduce((sum, entry) => sum + (entry.connectionCount || 0), 0);
      const totalFollowers = connectionData.reduce((sum, entry) => sum + (entry.followersCount || 0), 0);

      setNewConnections(totalConnections);
      setNewFollowers(totalFollowers);
    });
  }, []);

  const stats = [
    { value: newConnections, label: "New Connections" },
    { value: newFollowers, label: "New Followers" },
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
