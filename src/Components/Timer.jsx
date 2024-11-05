import React, { useState, useEffect } from 'react';

const Timer = ({ task, onTimeUpdate, isActive }) => {
    const [time, setTime] = useState(task.timeSpent); // Time is in seconds

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    const updatedTime = prevTime + 1;
                    onTimeUpdate(task.id, updatedTime); // Update time in the parent component
                    return updatedTime;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, task.id, onTimeUpdate]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')} hrs : ${mins.toString().padStart(2, '0')} mins : ${secs.toString().padStart(2, '0')} secs`;
    };

    return (
        <div className="flex items-center">
            <span>{formatTime(time)}</span>
        </div>
    );
};

export default Timer;
