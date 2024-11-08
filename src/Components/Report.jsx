import React, { useState } from 'react';
import { Chart } from 'react-chartjs-2';

const Report = ({ completedTasks }) => {
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    // Filter tasks based on the selected date range
    const filteredTasks = completedTasks.filter(task => {
        if (!dateRange.start || !dateRange.end) return true; // Show all if no date range set
        const taskDate = new Date(task.dateCompleted);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return taskDate >= startDate && taskDate <= endDate;
    });

    const totalHours = filteredTasks.reduce((total, task) => total + task.totalTimeSpent / 3600, 0);

    // Data for Chart.js
    const data = {
        labels: filteredTasks.map(task => task.dateCompleted),
        datasets: [
            {
                label: 'Time Spent (hours)',
                data: filteredTasks.map(task => task.totalTimeSpent / 3600),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Handle date range changes
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Report Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700">Completed Tasks Report</h2>
                <span className="text-xl font-bold text-blue-600">Total: {totalHours.toFixed(2)} hours</span>
            </div>

            {/* Date Range Filter */}
            <div className="flex my-4 space-x-4">
                <label className="flex flex-col">
                    Start Date
                    <input
                        type="date"
                        name="start"
                        value={dateRange.start}
                        onChange={handleDateChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </label>
                <label className="flex flex-col">
                    End Date
                    <input
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={handleDateChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </label>
            </div>

            {/* Chart Section */}
            <div className="my-4">
                {filteredTasks.length > 0 ? (
                    <Chart type="bar" data={data} options={{ responsive: true }} />
                ) : (
                    <p>No data available for the selected date range.</p>
                )}
            </div>

            {/* Task Details */}
            <h3 className="mt-8 text-xl font-semibold">Task Details</h3>
            <ul className="mt-4 space-y-4">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <li key={task.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                            <h4 className="text-lg font-bold text-gray-800">{task.title}</h4>
                            <p className="text-gray-600">Completed on: {task.dateCompleted}</p>
                            <p className="text-gray-600">Time spent: {formatTime(task.totalTimeSpent)}</p>
                        </li>
                    ))
                ) : (
                    <p>No completed tasks to display.</p>
                )}
            </ul>
        </div>
    );
};

// Function to format time
const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${seconds > 0 ? `${seconds}s` : ''}`.trim() || '0 seconds';
};

export default Report;
