import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components to use them in the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = ({ completedTasks }) => {
    // Format the time into total seconds for the chart
    const taskTitles = completedTasks.map(task => task.title);
    const taskTimes = completedTasks.map(task => task.totalTimeSpent);

    const chartData = {
        labels: taskTitles,
        datasets: [
            {
                label: 'Time Spent (seconds)',
                data: taskTimes,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Time Spent on Completed Tasks'
            },
            legend: {
                position: 'top',
            }
        }
    };

    // Format the time into a readable string (e.g., "2 hours, 30 minutes")
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
            <h1 className="mb-8 text-4xl font-bold text-center text-blue-600 font-poppins">Task Report</h1>

            {completedTasks.length === 0 ? (
                <p className="text-center text-gray-700">No completed tasks yet!</p>
            ) : (
                <>
                    <div className="mb-8">
                        <Bar data={chartData} options={chartOptions} />
                    </div>

                    <h2 className="mb-4 text-2xl font-semibold text-gray-700 font-poppins">Completed Tasks</h2>
                    <ul>
                        {completedTasks.map((task) => (
                            <li key={task.id} className="flex flex-col items-center justify-between p-4 mb-4 border rounded-lg shadow-md font-poppins md:flex-row bg-gray-50">
                                <span className="text-center text-gray-800 font-poppins md:text-left">
                                    <strong>{task.title}</strong> - Completed on <span className="font-semibold">{task.dateCompleted}</span>, took <span className="font-semibold">{formatTime(task.totalTimeSpent)}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Report;
