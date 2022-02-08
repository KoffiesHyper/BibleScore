import React from "react";
import './Account.css';

export default function Account({ user }) {
    return (
        <div className="account-container">
            <h2 className="setting-header">Profile Settings</h2>
            <div className="profile-settings">
                <div className="profile-setting">
                    <p className="left">Username</p>
                    <input className="default-input" value={user.username}></input>
                    <p className="right">Edit</p>
                </div>
                <div className="profile-setting">
                    <p className="left">First Name</p>
                    <input className="default-input" value={user.first_name}></input>
                    <p className="right">Edit</p>
                </div>
                <div className="profile-setting">
                    <p className="left">Last Name</p>
                    <input className="default-input" value={user.last_name}></input>
                    <p className="right">Edit</p>
                </div>
                <div className="profile-setting">
                    <p className="left">Email</p>
                    <input className="default-input" value={user.email}></input>
                    <p className="right">Edit</p>
                </div>
                <div className="profile-setting">
                    <p className="left">Birthdate</p>
                    <input className="default-input" value={user.date_of_birth}></input>
                    <p className="right">Edit</p>
                </div>
            </div>
        </div>
    );
}