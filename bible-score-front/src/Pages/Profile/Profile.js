import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useHistory, useParams } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { MdSettings } from 'react-icons/md';
import axios from "axios";

export default function Profile({ user }) {
    const [profileUser, setProfileUser] = useState({});
    const [otherUser, setOtherUser] = useState(false);

    const history = useHistory();
    const params = useParams();

    useEffect(async () => {
        const id = params.user;

        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, {
            headers: {
                'Api-Key': process.env.REACT_APP_SERVER_API_KEY
            }
        });

        setProfileUser(response.data);
        if (response.data.id != user.id) {
            setOtherUser(true);
        }
    }, [user])

    return (
        <div className="outer">
            {!otherUser &&
                <>
                    {(user) &&
                        <>
                            <div className="top-section">
                                <img width="75px" src="https://writestylesonline.com/wp-content/uploads/2020/01/Three-Things-To-Consider-When-Deciding-On-Your-LinkedIn-Profile-Picture.jpg" />
                                <div>
                                    <h2 className="default-label">{user.username}</h2>
                                    <h3 className="default-label">{`${user.first_name} ${user.last_name}`}</h3>
                                </div>
                                <button className="default-btn" onClick={() => history.push('/account-details')}>
                                    <IconContext.Provider value={{ color: 'white', size: '15px' }}><MdSettings /></IconContext.Provider>
                                </button>
                            </div>
                            <div className="testimony-section">
                                <h2 className="default-label">{`${user.first_name}'s Testimony`}</h2>
                                <p className="default-label">{user.testimony}</p>
                            </div>
                        </>
                    }
                </>
            }
            {otherUser &&
                <>
                    {(profileUser) &&
                        <>
                            <div className="top-section">
                                <img width="75px" src="https://writestylesonline.com/wp-content/uploads/2020/01/Three-Things-To-Consider-When-Deciding-On-Your-LinkedIn-Profile-Picture.jpg" />
                                <div>
                                    <h2 className="default-label">{profileUser.username}</h2>
                                    <h3 className="default-label">{`${profileUser.first_name} ${profileUser.last_name}`}</h3>
                                </div>
                            </div>
                            <div className="testimony-section">
                                <h2 className="default-label">{`${profileUser.first_name}'s Testimony`}</h2>
                                <p className="default-label">{profileUser.testimony}</p>
                            </div>
                        </>
                    }
                </>
            }

        </div >
    );
}