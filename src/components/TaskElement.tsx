import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const TaskElement = ({ title, description, isChecked }: { title: string, description: string, isChecked: boolean }) => {
  const [checked, setChecked] = useState(isChecked);

  return (
    <motion.div 
      layout = "position"
      className="mx-5 bg-white shadow-lg rounded-lg px-3 py-2 border-2 border-[#efefef]"
    >
      <div className="flex flex-col justify-center gap-1">
        <div className="flex items-center">
        <div className="flex text-[16px] text-start items-center gap-3 font-thin">
            <div
              className={`w-4 h-4 border-2 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                checked ? "bg-blue-500 border-blue-500" : "border-gray-400"
              }`}
              onClick={() => setChecked(!checked)}
            >
              {checked && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </div>
            <p className={`${checked ? "line-through text-[#a8a8a8]" : "text-[#302f2f] "}`}>
              {title}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {!checked && (
            <motion.div 
              key="description"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1 }}
              className="overflow-hidden"
            >
              <p className="text-[#a8a8a8] text-[12px] font-extralight text-start pl-[24px]">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskElement;
