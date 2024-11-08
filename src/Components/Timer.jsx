// Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ task, onTimeUpdate, isActive, onComplete }) => {
    const [time, setTime] = useState(task.timeSpent || 0);

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    const updatedTime = prevTime + 1;
                    onTimeUpdate(task.id, updatedTime);
                    return updatedTime;
                });
            }, 1000);
        } else if (!isActive && time > 0) {
            clearInterval(interval);
            onComplete(task.id, time);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    return <span>{new Date(time * 1000).toISOString().substr(11, 8)}</span>;
};

export default Timer;
