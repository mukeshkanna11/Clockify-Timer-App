import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), title: newTask, timeSpent: 0, isActive: false }]);
            setNewTask('');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const deleteCompletedTask = (id) => {
        setCompletedTasks(completedTasks.filter(task => task.id !== id));
    };

    const completeTask = (id, totalTimeSpent) => {
        const taskToComplete = tasks.find(task => task.id === id);
        if (taskToComplete) {
            const dateCompleted = new Date().toLocaleDateString();
            setCompletedTasks([...completedTasks, { ...taskToComplete, dateCompleted, totalTimeSpent, isActive: false }]);
            deleteTask(id);
        }
    };

    const updateTaskTime = (id, time) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, timeSpent: time } : task
        );
        setTasks(updatedTasks);
    };

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const hoursStr = hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''}` : '';
        const minutesStr = minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : '';
        const secondsStr = seconds > 0 ? `${seconds} second${seconds !== 1 ? 's' : ''}` : '';

        return [hoursStr, minutesStr, secondsStr].filter(Boolean).join(', ') || '0 seconds';
    };

    return (
        <div className="container mx-auto p-4 bg-gray-200 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Timer App</h1>
            <div className="mb-6 flex flex-col md:flex-row items-center justify-center">
                <input 
                    type="text" 
                    className="border border-gray-300 rounded-lg p-3 w-full md:w-auto focus:outline-none focus:border-indigo-500 shadow-md" 
                    placeholder="Enter a new task..." 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                />
                <button 
                    className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md mt-4 md:mt-0 md:ml-4 hover:bg-indigo-700 transition duration-300 w-full md:w-auto"
                    onClick={addTask}
                >
                    Add Task
                </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Active Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        onDelete={deleteTask} 
                        onComplete={completeTask} 
                        onTimeUpdate={updateTaskTime}
                    />
                ))}
            </ul>

            {completedTasks.length > 0 && (
                <>
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Completed Tasks</h2>
                    <ul>
                        {completedTasks.map(task => (
                            <li key={task.id} className="flex flex-col md:flex-row justify-between items-center border p-4 mb-4 rounded-lg bg-green-100 shadow-md">
                                <span className="text-center md:text-left text-gray-800">{task.title} - Completed on {task.dateCompleted}, took {formatTime(task.totalTimeSpent)}</span>
                                <button 
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md mt-4 md:mt-0 hover:bg-red-600 transition duration-300"
                                    onClick={() => deleteCompletedTask(task.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default TaskList;
