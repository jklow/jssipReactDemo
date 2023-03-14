import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

// component for the admin login
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // change email state after user key in the email
    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    // change password state after user key in the password
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    // make an axios post request after user click the log in button
    const handleSubmit = e => {
        e.preventDefault();

        // create the payload to be sent to the back end
        const body = {
            email: email,
            password: password
        }

        // make an axios post request
        axios.post('http://localhost:3001/admin', body)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                window.location.assign('http://localhost:3000');
            })
            .catch(error => { alert('Invalid credentials') });
    }

    return (
        <div>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">SIP Demo</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user-o"></span>
                                </div>
                                <h3 className="text-center mb-4">Sign In</h3>
                                <form onSubmit={handleSubmit} className="login-form">
                                    <div className="form-group">
                                        <input type="text" id="Email"
                                            value={email}
                                            onChange={handleEmailChange} className="form-control rounded-left" placeholder="Email" required />
                                    </div>
                                    <div className="form-group d-flex">
                                        <input type="password" className="form-control rounded-left" placeholder="Password"
                                            id="Password"
                                            value={password}
                                            onChange={handlePasswordChange} required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"
                                            className="form-control btn btn-primary rounded submit px-3">Login</button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50">
                                            <label className="checkbox-wrap checkbox-primary">Remember Me
                                        <input type="checkbox" checked />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="#">Forgot Password</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>





        </div>


    )

}

function LoginPage() {
    return (
        <div>
            <Login />
        </div>
    )
}

export default LoginPage;