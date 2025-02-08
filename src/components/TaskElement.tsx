import React, { useState } from 'react';
import Checkbox from './Checkbox';


const TaskElement = ({title, description, isChecked} : {title : string, description : string, isChecked : boolean}) => {


  return (
    <div className="mx-5 bg-white shadow-lg rounded-lg px-3 py-2 border-2 border-[#efefef]">
  
      <div className='flex flex-col justify-center'>
        <div className="flex items-center">
          <div className="flex text-lg  font-semibold text-gray-800 text-start items-center gap-3">
              <Checkbox/>
              {title}
          </div>
        </div>
        <p className="text-gray-600 text-[12px] font-extralight text-start pl-[24px]">
            {description}
        </p>
      </div>
    </div>
  );
};

export default TaskElement;