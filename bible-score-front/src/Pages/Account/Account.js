import React from "react";
import './Account.css';

export default function Account() {
    return (
        <div className="outer-container">
            <h2 className="default-label" >Profile Settings</h2>
            <div className="profile-settings">
                <div className="profile-setting">
                    <p className="left">Username</p>
                    <input className=""></input>
                    <p className="right">Edit</p>
                </div>
                <div className="profile-setting">
                    <p className="left">First Name</p>
                    <input></input>
                    <p className="right">Edit</p>
                </div>
                <div className="profile-setting">
                    <p className="left">Last Name</p>
                    <input></input>
                    <p className="right">Edit</p>
                </div>
                <div className="profile-setting">
                    <p className="left">Email</p>
                    <input></input>
                    <p className="right">Edit</p>
                </div>
                <div className="profile-setting">
                    <p className="left">Birthdate</p>
                    <input></input>
                    <p className="right">Edit</p>
                </div>
            </div>

        </div>
    );
}