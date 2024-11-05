// Components/Report.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = ({ completedTasks }) => {
    // Prepare data for the chart
    const data = {
        labels: completedTasks.map(task => task.title),
        datasets: [
            {
                label: 'Time Spent (seconds)',
                data: completedTasks.map(task => task.totalTimeSpent),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Completed Tasks - Time Spent' },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Time (seconds)' },
            },
        },
    };

    // Helper to format time spent in a readable way
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const hoursStr = hours > 0 ? `${hours} hr${hours !== 1 ? 's' : ''}` : '';
        const minutesStr = minutes > 0 ? `${minutes} min${minutes !== 1 ? 's' : ''}` : '';
        const secondsStr = seconds > 0 ? `${seconds} sec${seconds !== 1 ? 's' : ''}` : '';

        return [hoursStr, minutesStr, secondsStr].filter(Boolean).join(', ') || '0 seconds';
    };

    return (
        <div className="max-w-4xl p-6 mx-auto my-8 bg-white rounded-lg shadow-md sm:p-8 md:p-12">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700 sm:text-3xl">Report</h2>
            <div className="md:flex md:space-x-8">
                {/* Chart Section */}
                <div className="flex justify-center md:w-1/2">
                    <div className="w-full max-w-lg">
                        <Bar data={data} options={options} />
                    </div>
                </div>

                {/* Task Details Section */}
                <div className="mt-8 md:mt-0 md:w-1/2">
                    <h3 className="mb-4 text-xl font-semibold text-gray-600">Task Details</h3>
                    <ul className="space-y-4">
                        {completedTasks.map((task) => (
                            <li key={task.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                                <h4 className="text-lg font-medium text-gray-800">{task.title}</h4>
                                <p className="text-gray-600">Completed on: <span className="font-semibold">{task.dateCompleted}</span></p>
                                <p className="text-gray-600">Time Spent: <span className="font-semibold">{formatTime(task.totalTimeSpent)}</span></p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Report;
