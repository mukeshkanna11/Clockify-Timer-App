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
        <div className="container min-h-screen p-6 mx-auto bg-gray-100">
            <h1 className="mb-8 text-4xl font-bold text-center text-blue-600 font-poppins">Task Timer App</h1>
            <div className="flex flex-col items-center justify-center mb-6 md:flex-row">
                <input 
                    type="text" 
                    className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg shadow-md font-poppins md:w-auto focus:outline-none focus:border-blue-500" 
                    placeholder="Enter a new task..." 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                />
                <button 
                    className="w-full px-6 py-3 mt-4 text-white transition duration-300 bg-blue-600 rounded-lg shadow-md font-poppins md:mt-0 md:ml-4 hover:bg-blue-700 md:w-auto"
                    onClick={addTask}
                >
                    Add Task
                </button>
            </div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700 font-poppins">Active Tasks</h2>
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
                    <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-700 font-poppins">Completed Tasks</h2>
                    <ul>
                        {completedTasks.map(task => (
                            <li key={task.id} className="flex flex-col items-center justify-between p-4 mb-4 border rounded-lg shadow-md font-poppins md:flex-row bg-gray-50">
                                <span className="text-center text-gray-800 font-poppins md:text-left">
                                    {task.title} - Completed on {task.dateCompleted}, took {formatTime(task.totalTimeSpent)}
                                </span>
                                <button 
                                    className="px-4 py-2 mt-4 text-white transition duration-300 bg-red-500 rounded-lg shadow-md font-poppins md:mt-0 hover:bg-red-600"
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
