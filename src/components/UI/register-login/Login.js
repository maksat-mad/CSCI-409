import React from 'react';
import './Register-Login.css';

const Login = () => {
    return (
        <div className={"register-login"}>
            <div className={"container"}>
                <h1>Login</h1>
            </div>
            <div className={"container"}>
                <form>
                    <label htmlFor={"email"}>Email:</label><br/>
                    <input type={"email"} id={"email"} name={"email"} required/><br/>
                    <label htmlFor={"password"}>Password:</label><br/>
                    <input type={"password"} id={"password"} name={"password"} required/><br/>
                    <div className={"container"}>
                        <button className={"input-button"} type="submit">login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;