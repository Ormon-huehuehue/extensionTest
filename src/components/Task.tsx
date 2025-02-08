import React from 'react';
import { panel, panelStateAtom } from '@src/state/atoms';
import { useRecoilState } from 'recoil';

const [selectedPanel, setSelectedPanel] = useRecoilState<panel>(panelStateAtom);

const Task = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Engage with Your Network</h2>
      <p className="text-gray-600 mb-4">
        Prioritize quality interactions with key connections and potential clients. Write thoughtful comments that demonstrate your expertise and offer value. Don't just say "Great post!"
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Learn More
      </button>
    </div>
  );
};

export default Task;