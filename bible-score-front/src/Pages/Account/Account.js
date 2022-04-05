import React, { useState } from "react";
import axios from "axios";
import './Account.css';

export default function Account({ user }) {
    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [birthDate, setBirthDate] = useState();

    const updateAccount = async () => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${user.id}/`, {
            username: username ? username : user.username,
            first_name: firstName ? firstName : user.first_name,
            last_name: lastName ? lastName : user.last_name,
            email: email ? email : user.email,
            date_of_birth: birthDate ? birthDate : user.date_of_birth,
            password: user.password
        },
        {
            headers: {
                'Api-Key': process.env.REACT_APP_SERVER_API_KEY
            }
        });

        console.log(response);
    }

    return (
        <div className="account-container">
            <h2 className="setting-header">Profile Settings</h2>
            <div className="profile-settings">
                <div className="profile-setting">
                    <p className="left">Username</p>
                    <input onChange={(event) => setUsername(event.target.value)} className="default-input" value={username ? username : user.username}></input>
                </div>
                <div className="profile-setting">
                    <p className="left">First Name</p>
                    <input onChange={(event) => setFirstName(event.target.value)} className="default-input" value={firstName ? firstName : user.first_name}></input>
                </div>
                <div className="profile-setting">
                    <p className="left">Last Name</p>
                    <input onChange={(event) => setLastName(event.target.value)} className="default-input" value={lastName ? lastName : user.last_name}></input>
                </div>
                <div className="profile-setting">
                    <p className="left">Email</p>
                    <input onChange={(event) => setEmail(event.target.value)} className="default-input" value={email ? email : user.email}></input>
                </div>
                <div className="profile-setting">
                    <p className="left">Birthdate</p>
                    <input onChange={(event) => setBirthDate(event.target.value)} className="default-input" value={birthDate ? birthDate : user.date_of_birth}></input>
                </div>
                <button onClick={updateAccount} className="default-btn">Update</button>
            </div>
        </div>
    );
}