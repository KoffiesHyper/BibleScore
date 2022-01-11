import React from "react";
import './ProgressBar.css';

export default function ProgressBar({ barAnim }) {
    return (
        <div className="progress-container">
            <div className="progress-labels">
                <div className="progress-label">
                    <h3>Read</h3>
                    <p>o</p>
                    <p>o</p>
                </div>
                <div className="progress-label">
                    <h3>Fill</h3>
                    <p>o</p>
                    <p>o</p>
                </div>
                <div className="progress-label">
                    <h3>Rewrite</h3>
                    <p>o</p>
                    <p>o</p>
                </div>
                <div className="progress-label">
                    <h3>Finish</h3>
                    <p>o</p>
                    <p>o</p>
                </div>
            </div>
            <div className="progress-bar">
                <div className="progress" style={{ animationName: barAnim }} ></div>
            </div>
        </div>
    );
}