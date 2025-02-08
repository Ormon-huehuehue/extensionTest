import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Checkbox() {
  const [checked, setChecked] = useState(false);

  return (
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
  );
}
