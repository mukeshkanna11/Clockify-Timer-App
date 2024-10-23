import React, { useState, useEffect } from 'react';

const Timer = ({ task, onTimeUpdate, isActive }) => {
    const [time, setTime] = useState(task.timeSpent);

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
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time, task.id, onTimeUpdate]);

    useEffect(() => {
        // Update time whenever task is stopped to keep state consistent
        if (!isActive) {
            onTimeUpdate(task.id, time);
        }
    }, [isActive, time, task.id, onTimeUpdate]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center">
            <span>{formatTime(time)}</span>
        </div>
    );
};

export default Timer;
