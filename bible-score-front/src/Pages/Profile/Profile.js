import React, { useEffect } from "react";
import "./Profile.css";
import { useHistory, useParams } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { MdSettings } from 'react-icons/md';

export default function Profile({ user }) {

    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        console.log(params)
    })

    return (
        <div className="outer">
            <div className="top-section">
                <img width="75px" src="https://writestylesonline.com/wp-content/uploads/2020/01/Three-Things-To-Consider-When-Deciding-On-Your-LinkedIn-Profile-Picture.jpg" />
                <h2 className="default-label">{user.username}</h2>
                <button className="default-btn" onClick={() => history.push('/account-details')}><IconContext.Provider value={{ color: 'white', size: '15px' }}><MdSettings /></IconContext.Provider></button>
            </div>
            <div className="testimony-section">
                <h2 className="default-label">{`${user.first_name}'s Testimony`}</h2>
                <p className="default-label">"It was so great to hear from you today and it was such weird timing," he said. "This is going to sound funny and a little strange, but you were in a dream I had just a couple of days ago. I'd love to get together and tell you about it if you're up for a cup of coffee," he continued, laying the trapped he's been planning for years.</p>
            </div>
        </div>
    );
}