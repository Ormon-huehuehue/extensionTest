import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Profile {
  imageElement: string; // Store as string (HTML)
  userDataElement: string;
}

const Connections = () => {
  const [suggestions, setSuggestions] = useState<Profile[] | null>(null);

  const setSuggestedProfiles = async () => {
    const { suggestedProfiles } = await chrome.storage.local.get("suggestedProfiles");

    if (suggestedProfiles) {
      setSuggestions(suggestedProfiles);
      console.log("SuggestedProfiles : ", suggestedProfiles)
    } else {
      console.error("No suggestions yet");
    }
  };

  useEffect(() => {
    setSuggestedProfiles();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center text-headingText text-xl">Suggested Profiles</h1>
      <div className="flex flex-col items-center pt-5 px-3 gap-4">
        {suggestions?.map((profile, index) => (
          <ProfileCard key={index} imageHTML={profile.imageElement} userDataHTML={profile.userDataElement} />
        ))}
      </div>
    </div>
  );
};

export default Connections;

// ✅ Updated ProfileCard
const ProfileCard = ({ imageHTML, userDataHTML }: { imageHTML: string; userDataHTML: string }) => {
  return (
    <motion.div layout="position" className="mx-0 bg-white shadow-lg rounded-lg px-3 py-2 border-2 border-[#efefef]">
      <div className="flex items-center gap-3">
        {/* Image Element */}
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <div dangerouslySetInnerHTML={{ __html: imageHTML }} />
        </div>

        {/* User Data */}
        <div className="flex flex-col">
          <div dangerouslySetInnerHTML={{ __html: userDataHTML }} />
        </div>
      </div>
    </motion.div>
  );
};
