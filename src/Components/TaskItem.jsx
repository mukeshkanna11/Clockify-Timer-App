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
        if (isActive) {
            onComplete(task.id, task.timeSpent);
        }
    };

    return (
        <li className="flex flex-col md:flex-row items-center justify-between border p-4 mb-2 rounded">
            <span className="mb-2 md:mb-0">{task.title}</span>
            <div className="flex flex-col md:flex-row items-center">
                <Timer task={task} onTimeUpdate={onTimeUpdate} isActive={isActive} />
                <button className="bg-green-500 text-white py-1 px-3 ml-0 md:ml-4 mt-2 md:mt-0 rounded" onClick={handleStartStop}>
                    {isActive ? 'Stop' : 'Start'}
                </button>
                <button className="bg-red-500 text-white py-1 px-3 ml-0 md:ml-4 mt-2 md:mt-0 rounded" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </li>
    );
};

export default TaskItem;
