// Register.jsx
import React, { useState, useEffect } from 'react';
import '../SharedCSS/SharedCss.css';
import axios from "axios";

const Register = () => {
    const [employee_name, setEmployeename] = useState("");
    const [employeeNameError, setEmployeeNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [companyNameError, setCompanyNameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState("");

    useEffect(() => {
        document.title = 'Register: Create an Account';
        return () => {
            document.title = 'Access HR';
        };
    }, []);

    const validateInput = () => {
        let isValid = true;
        const namePattern = /^[a-zA-Z\s]*$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!employee_name) {
            setEmployeeNameError("* Please fill in the employee name.");
            isValid = false;
        }  else if (!namePattern.test(employee_name)) {
            setEmployeeNameError("Name must not contain numbers or special characters.");
            isValid = false;
        }
        else {
            setEmployeeNameError("");
        }

        if (!email) {
            setEmailError("* Please fill in the email.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            setEmailError("* Invalid email format. ");
            // setEmailError("* valid email format : john.doe@example.com ");

            isValid = false;
        }
        else {
            setEmailError("");
        }

        if (!companyname) {
            setCompanyNameError("* Please fill in the company name.");
            isValid = false;
        } else {
            setCompanyNameError("");
        }

        if (!password) {
            setPasswordError("* Please fill in the password.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const redirectToLogin = () => {
        setTimeout(() => {
            window.location.href = "/";
        }, 5000);
    };

    useEffect(() => {
        if (registrationSuccess) {
            redirectToLogin();
        }
    }, [registrationSuccess]);

    async function save(event) {
        event.preventDefault();
        if (!validateInput()) {
            return;
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;

        if (!passwordPattern.test(password)) {
            setPasswordError("* Password must be at least 7 characters long, contain at least one special character, and have one number.");
            return;
        } else {
            setPasswordError("");
        }

        setLoading(true);
        try {
            const emailExists = await isEmailExists(email);
            if (emailExists) {
                setEmailExistsError("* Email already exists. Try Logging into the the Application");
                setLoading(false);
                return;
            }
            await axios.post("http://localhost:8085/api/v1/employee/save", {
                employeename: employee_name,
                email: email,
                companyname: companyname,
                password: password,
            });
            setRegistrationSuccess(true);
            setEmployeename("");
            setEmail("");
            setCompanyname("");
            setPassword("");
            setTimeout(() => {
                setRegistrationSuccess(false);
            }, 4000);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    }
    const isEmailExists = async (email) => {
        try {
            const response = await axios.post("http://localhost:8085/api/v1/employee/emailExists", {
                email: email,
            });
            return response.data.exists;
        } catch (err) {
            console.error("Error checking email existence:", err);
            return false;
        }
    };
    return (
        <>
            <div className="container">
                <main className="signup-container">
                    <h1 className="heading-primary">Sign up<span className="span-blue">.</span></h1>
                    <p className="text-mute">Create an Account to get complete Access.</p>
                    <form className="signup-form" onSubmit={save}>
                        <label className="inp">
                            <input type="text" className="input-text" placeholder="&nbsp;"
                                   value={employee_name}
                                   onChange={(e) => setEmployeename(e.target.value)}/>
                            <span className="label">Full Name</span>
                            <span className="input-icon"></span>
                        </label>
                        {employeeNameError && <p className="error-message">{employeeNameError}</p>}

                        <label className="inp">
                            <input type="email" className="input-text" placeholder="&nbsp;"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                            <span className="label">Email</span>
                            <span className="input-icon"></span>
                        </label>
                        {emailError && <p className="error-message">{emailError}</p>}
                        {emailExistsError && <p className="error-message">{emailExistsError}</p>}

                        <label className="inp">
                            <input type="text" className="input-text" placeholder="&nbsp;"
                                   value={companyname}
                                   onChange={(e) => setCompanyname(e.target.value)}/>
                            <span className="label">Company Name</span>
                            <span className="input-icon"></span>
                        </label>
                        {companyNameError && <p className="error-message">{companyNameError}</p>}

                        <label className="inp">
                            <input type="password" className="input-text" placeholder="&nbsp;"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <span className="label">Password</span>
                            <span className="input-icon input-icon-password"></span>
                        </label>
                        {passwordError && <p className="error-message">{passwordError}</p>}

                        <button className="btn btn-login" type="submit" disabled={loading}>
                            {loading ? "Loading..." : "Register →"}
                        </button>

                        {registrationSuccess &&
                            <span id="color-rediect">Registration is Successful
                                <p className="redirect-message">Redirecting to Login...</p>
                            </span>
                        }

                        <label className="privacy_policy">By clicking the Register button, you agree to our <span>Terms & Conditions</span> and <span>Privacy Policy</span>.</label>
                    </form>

                    <p className="text-mute">Already a member? <a href="/login">Login</a></p>

                </main>
                <div className="welcome-container">
                    <h1 className="heading-secondary">Welcome to <span className="lg">MT Buddy!</span></h1>
                </div>

            </div>
        </>
    );
}

export default Register;
