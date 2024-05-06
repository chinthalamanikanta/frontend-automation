import React from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Navbar from './HomePage/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './HomePage/Dashboard';
import Employee from './HomePage/Employee';

function App() {
    // Check if email is present in localStorage
    const isLoggedIn = localStorage.getItem('email');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
                {/* Redirect to login if not logged in */}
                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route path="/*" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
}

function Main() {
    const location = useLocation();
    const showNavbar = !['/login', '/register'].includes(location.pathname);

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee" element={<Employee />} />
                {/* Add more routes as needed */}
            </Routes>
        </>
    );
}

export default App;
