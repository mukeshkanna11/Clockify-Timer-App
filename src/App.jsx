import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import TaskList from './Components/TaskList';
import Report from './Components/Report';

function App() {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open state

    const handleCompleteTask = (task) => {
        setCompletedTasks([...completedTasks, task]);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };

    return (
        <Router>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar with dynamic width */}
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                <div className={`flex-grow flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
                    <Navbar toggleSidebar={toggleSidebar} />
                    <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
                        <Routes>
                            <Route path="/timer" element={<TaskList onCompleteTask={handleCompleteTask} />} />
                            <Route path="/report" element={<Report completedTasks={completedTasks} />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
