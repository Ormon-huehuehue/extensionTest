import React from 'react'
import Dropdown from './DropdownList'
import StatsGrid from './StatsGrid'

const Insights = () => {
  return (
    <div className='flex flex-col mx-5 border-2 rounded-xl border-[#efefef]'>
      <div className='flex justify-between mx-4 items-center mt-2'>
        <p className='text-[16px] text-[#434343]'>Engagement Insights</p>
        <Dropdown />
      </div>
      <div>
        <StatsGrid/>
      </div>
    </div>
  )
}

export default Insights