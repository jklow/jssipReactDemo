import React, { useState } from 'react';
import $ from 'jquery';
import '../style.css';

// component for login
function Login() {

    // make an jquery post request after user click the log in button
    const handleSubmit = e => {
        e.preventDefault();

        var email = $('#email').val(); //get email
        var password = $('#pwd').val();//get password

        var jsonData = `{"email":"${email}","password":"${password}"}`;

        //console.log(jsonData);
        $.ajax({
            url: "http://localhost:8081/user/login",
            type: "POST",
            data: jsonData,
            contentType: "application/json",
            dataType: "json",
            success: function (result, textStatus, xhr) {
                console.log(result.token)

                //setting local storage
                localStorage.setItem("token", result.token);//JWT Token
                localStorage.setItem("userData", result.UserData);
                
                window.location.assign("chat");

            },
            error: function (xhr, status, error) {
                console.log("error");
                alert(error);
            }

        });
    }

    return (
        <div>
            <section className="ftco-section">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user-o"></span>
                                </div>
                                <h3 className="text-center mb-4">Sign In</h3>
                                <form onSubmit={handleSubmit} className="login-form">
                                    <div className="form-group">
                                        <input type="text" id="email"
                                            className="form-control rounded-left" placeholder="Email" required />
                                    </div>
                                    <div className="form-group d-flex">
                                        <input type="password" className="form-control rounded-left" placeholder="Password"
                                            id="pwd"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit"
                                            className="form-control btn btn-primary rounded submit px-3">Login</button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50">
                                            <label className="checkbox-wrap checkbox-primary">Remember Me
                                                <input type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="#">Forgot Password</a>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-center">
                                            No account?{' '}
                                            <a href="register" className="text-primary fw-bold">
                                                Register
                                            </a>
                                        </p>
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