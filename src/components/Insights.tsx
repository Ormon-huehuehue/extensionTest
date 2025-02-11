import React from "react";
import Dropdown from "./DropdownList";
import { motion } from "framer-motion";
import StatsGrid from "./StatsGrid";

const Insights = () => {
  return (
    <motion.div
      key="insights"
      initial={{ opacity: 0, scaleY: 0.5, originY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="flex flex-col mx-5 border-2 rounded-xl border-[#efefef] overflow-hidden"
    >
      <div className="flex justify-between mx-4 items-center mt-2">
        <p className="text-[16px] text-[#434343]">Engagement Insights</p>
        <Dropdown />
      </div>
      <div>
        <StatsGrid />
      </div>
    </motion.div>
  );
};

export default Insights;
