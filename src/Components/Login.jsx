import React, { useEffect, useState } from 'react';
import '../SharedCSS/SharedCss.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Sign in: Access Identify';
        return () => {
            document.title = 'Access HR';
        };
    }, []);

    async function login(event) {
        event.preventDefault();
        if (!email || !password) {
            setError('* Both email and password are required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8085/api/v1/employee/login', {
                email: email,
                password: password,
            });
            const { message } = response.data;
            if (message === 'Email not exists') {
                setError('* Email not exists');
            } else if (message === 'Login Success') {
                localStorage.setItem('email', email); // Store email in local storage
                navigate('/dashboard');
                // Trigger useEffect in App.js to update isLoggedIn state
                window.dispatchEvent(new Event('storage')); // Dispatch storage event
            } else {
                setError('* Incorrect Email and Password not match');
            }
        } catch (err) {
            setError('* An error occurred while logging in');
            console.error('Login error:', err);
        }
    }

    return (
        <div className="container">
            <main className="signup-container">
                <h1 className="heading-primary">Sign in<span className="span-blue">.</span></h1>
                <p className="text-mute">Enter your credentials to access your account.</p>
                {error && <p className="error-message">{error}</p>}
                <form className="signup-form">
                    <label className="inp">
                        <input
                            type="email"
                            className="input-text"
                            placeholder="&nbsp;"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <span className="label">Email</span>
                        <span className="input-icon"></span>
                    </label>
                    <label className="inp">
                        <input
                            type="password"
                            className="input-text"
                            placeholder="&nbsp;"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <span className="label">Password</span>
                        <span className="input-icon input-icon-password"></span>
                    </label>
                    <button className="btn btn-login" onClick={login}>
                        Get Started &rarr;
                    </button>
                    <label className="privacy_policy">
                        {' '}
                        <span>Terms & Conditions</span> | <span>Privacy Policy</span>.
                    </label>
                </form>
                <p className="text-mute">
                    Not a member? <a href="/register">Register</a>
                </p>
            </main>
            <div className="welcome-container">
                <h1 className="heading-secondary">
                    Welcome to <span className="lg">MT Buddy!</span>
                </h1>
            </div>
        </div>
    );
};

export default Login;
