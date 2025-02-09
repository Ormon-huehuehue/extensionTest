import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set dropdown width to match button width
  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button */}
      <button
        ref={buttonRef}
        className="flex items-center gap-2 px-4 py-1 text-[10px] border-2 border-[#efefef] font-medium bg-[#f9fbfc] text-[#434343] rounded-lg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        Last 7 days
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            style={{ width: width || "auto" }}
          >
            <ul className="py-2 text-[#787878]">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Last 24 hours</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Last 7 days</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Last 30 days</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
