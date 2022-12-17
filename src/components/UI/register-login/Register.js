import React from 'react';
import './Register-Login.css';

const Register = () => {
    return (
        <div className={"register-login"}>
            <div className={"container"}>
                <h1>Registration</h1>
            </div>
            <div className={"container"}>
                <form onSubmit={() => console.log("registration")}>
                    <label htmlFor={"fname"}>Name:</label><br/>
                    <input type={"text"} id={"fname"} name={"fname"} required/><br/>
                    <label htmlFor={"lname"}>Surname:</label><br/>
                    <input type={"text"} id={"lname"} name={"lname"} required/><br/>
                    <label htmlFor={"tel"}>Phone:</label><br/>
                    <input type={"tel"} id={"tel"} name={"tel"} required/><br/>
                    <fieldset>
                        <legend>Gender</legend>
                        <div className={"container-fieldset"}>
                            <input type={"radio"} id={"male"} name={"gender"} value={"male"}/>
                            <label htmlFor={"male"}>Male</label>
                        </div>
                        <div className={"container-fieldset"}>
                            <input type={"radio"} id={"female"} name={"gender"} value={"female"}/>
                            <label htmlFor={"female"}>Female</label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Date of birth</legend>
                        <div className={"container-fieldset"}>
                            <input type={"date"} id={"date"} name={"date"} required/>
                        </div>
                    </fieldset>
                    <div className={"input-error"}>
                        (!) User must be over 15 years of age to register
                    </div>
                    <label htmlFor={"email"}>Email:</label><br/>
                    <input type={"email"} id={"email"} name={"email"} required/><br/>
                    <div className={"input-error"}>
                        (!) There is already a user with this email, enter another one
                    </div>
                    <label htmlFor={"password"}>Password:</label><br/>
                    <input type={"password"} id={"password"} name={"password"} required/><br/>
                    <label htmlFor={"password"}>Confirm password:</label><br/>
                    <input type={"password"} id={"password2"} name={"password"} required/><br/>
                    <div className={"input-error"}>
                        (!) Confirmed password does not match the first entered password
                    </div>
                    <div className={"container"}>
                        <button className={"input-button"} type="submit">register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;