import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/img/dummyProfile.png"

const dummyData = [
  {
    Location : "Location",
    Name : "Tom Baker",
    Description : "Managing Director and co-founder at XYZ Company",
  },
  {
    Location : "Location",
    Name : "Tom Baker",
    Description : "Managing Director and co-founder at XYZ Company",
  },
  {
    Location : "Location",
    Name : "Tom Baker",
    Description : "Managing Director and co-founder at XYZ Company",
  }
]


const Connections = () => {

  useEffect(()=>{

  })

  return (
    <div className= 'flex flex-col'>
      <h1 className='w-full text-center text-headingText text-xl'>Suggested Profiles</h1>
      <div className='flex flex-col items-center pt-5 px-3 gap-4'>
        {dummyData.map((data, index) => (
          <ProfileCard key={index} description={data.Description} name={data.Name} />
        ))}
      </div>
    </div>
  )
}

export default Connections




const ProfileCard = ({ description, name }: { location: HTMLElement, description: string, name: String }) => {

  return (
    <motion.div 
      layout = "position"
      className="mx-0 bg-white shadow-lg rounded-lg px-3 py-2 border-2 border-[#efefef]"
    >
      <div className="flex flex-col justify-center gap-1">
        <div className="flex items-center">
          <div className="flex text-[16px] text-start items-center gap-3 font-thin">
            <div className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ">
              <img src= {logo} alt="" width={50} height={50}/>
            </div>
            <div className="flex flex-col">
              <p className={`text-[#302f2f] `}>
                {name}
              </p>
            </div>
          </div>
        </div>
      </div>

        <AnimatePresence>
            <motion.div 
              key="description"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1 }}
              className="overflow-hidden"
            >
              <p className="text-[#a8a8a8] text-[12px] font-extralight text-start pl-[30px]">
                {description}
              </p>
            </motion.div>
        </AnimatePresence>
      
    </motion.div>
  );
};


