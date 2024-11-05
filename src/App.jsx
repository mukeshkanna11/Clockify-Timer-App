// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import TaskList from './Components/TaskList';
import Report from './Components/Report';

function App() {
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleCompleteTask = (task) => {
        setCompletedTasks([...completedTasks, task]);
    };

    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                    <Navbar />
                    <Routes>
                        <Route path="/timer" element={<TaskList onCompleteTask={handleCompleteTask} />} />
                        <Route path="/report" element={<Report completedTasks={completedTasks} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
