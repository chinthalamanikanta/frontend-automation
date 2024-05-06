import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('email');
        if (!isLoggedIn) {
            // If user is not logged in, redirect to login page
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
            {/* Dashboard content goes here */}
        </div>
    );
};

export default Dashboard;
