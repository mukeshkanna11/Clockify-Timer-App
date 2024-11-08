// TaskItem.js
import React, { useState } from 'react';
import Timer from './Timer';

const TaskItem = ({ task, onDelete, onComplete, onTimeUpdate }) => {
    const [isActive, setIsActive] = useState(false);

    const handleComplete = () => {
        setIsActive(false);
        onComplete(task.id, task.timeSpent);
    };

    const handleStartStop = () => {
        setIsActive(!isActive);
    };

    return (
        <li className="flex flex-col items-center justify-between p-4 mb-4 bg-white border rounded-lg shadow-md md:flex-row">
            <span className="mb-2 font-medium text-gray-700 font-poppins md:mb-0">{task.title}</span>
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                <button 
                    className={`py-1 px-4 rounded-full font-poppins transition-colors duration-200 ${
                        isActive ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={handleStartStop}
                >
                    {isActive ? 'Stop' : 'Start'}
                </button>
                <button 
                    className="px-4 py-1 text-white transition-colors duration-200 bg-red-500 rounded-full font-poppins hover:bg-red-600"
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>
                <Timer task={task} onTimeUpdate={onTimeUpdate} isActive={isActive} onComplete={handleComplete} />
            </div>
        </li>
    );
};

export default TaskItem;
