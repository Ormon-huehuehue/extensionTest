import React from 'react'


const Navbar = () => {
  return (
    <div className= 'w-[80%] flex py-2 px-3 text-[#1f1f1f] justify-around border-2 border-[#efefef] bg-[#f9fbfc] rounded-xl'>
        <div className = 'flex text-[#1f1f1f]'>
          <button onClick={()=> {
             // setSelectedPanel('Insights')
          }}>
            Insights
          </button>
        </div>
        <div className = 'flex'>
            Tasks
        </div>
        <div className = 'flex'>
            Connections
        </div>
    </div>
  )
}

export default Navbar