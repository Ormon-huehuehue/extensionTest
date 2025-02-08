import React from 'react'
import { panel, panelStateAtom } from '@src/state/atoms';
import { useSetRecoilState } from 'recoil';




const Navbar = () => {

  const setSelectedPanel = useSetRecoilState<panel>(panelStateAtom);
  
  return (
    <div className= 'w-[80%] flex py-2 px-3 text-[#1f1f1f] justify-around border-2 border-[#efefef] bg-[#f9fbfc] rounded-xl'>
        <div className = 'flex text-[#1f1f1f]'>
          <button onClick={()=> setSelectedPanel('Insights')}>
            Insights
          </button>
        </div>
        <div className = 'flex'>
          <button onClick={()=> setSelectedPanel('Tasks')}>
          Tasks
          </button>
        </div>
        <div className = 'flex'>
          <button onClick={()=> setSelectedPanel('Connections')}>
          Connections
          </button>
        </div>
    </div>
  )
}

export default Navbar