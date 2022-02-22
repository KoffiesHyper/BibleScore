import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PassageFinder from '../../Components/Passage/Passage';
import './Dashboard.css';
import { FaUserFriends } from 'react-icons/fa';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';

export default function Dashboard({ user, savedVerses, friendRequests, friends, prayerRequests }) {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [showOverlay, setShowOverlay] = useState(false);
    const [requestOnOverlay, setRequestOnOverlay] = useState({});

    const navigate = useHistory();

    const sendPrayerRequest = async () => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/prayer-request/${user.id}`, {
            "title": title,
            "description": description
        }, {
            headers:{
                'Api-Key': process.env.REACT_APP_SERVER_API_KEY
            }
        });
    }

    const showPrayerInfo = (request) => {
        setShowOverlay(true)
        setRequestOnOverlay(request);
    }

    if (!user) return (
        <div className='nouser-container'>
            <h2 className='default-label'>You Must Sign In To Access a Dashbaord</h2>
            <div className='buttons'>
                <Link to='/register'><button className='default-btn'>Register</button></Link>
                <Link to='/login'><button className='default-btn'>Sign In</button></Link>
            </div>
        </div>
    );
    return (user &&
        <div className='dashboard-container'>
            {showOverlay &&
                <div className='overlay'>
                    <div className='prayer-request-info'>
                        <button className='default-btn' onClick={() => setShowOverlay(false)}>Done</button>
                        <h2 className='default-label'>{requestOnOverlay.from.username}</h2>
                        <h3 className='default-label'>{`${requestOnOverlay.from.first_name} ${requestOnOverlay.from.last_name}`}</h3>
                        <div className='prayer-info-text'>
                            <h3 className='default-label'>{requestOnOverlay.title}</h3>
                            <p className='default-label'>{requestOnOverlay.description}</p>
                        </div>
                    </div>
                </div>
            }
            <div className='social'>
                <h2 className='default-label'>Social</h2>
                <div className='heading'>
                    <IconContext.Provider value={{ color: 'white' }}><FaUserFriends /></IconContext.Provider>
                    <h3 className='default-label'>Brethren</h3>
                </div>
                <div>
                    {
                        friends.map((e, i) => {
                            return (
                                <div className='friend-box'>
                                    <h3 className='default-label' >{e.username}</h3>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='heading'>
                    <IconContext.Provider value={{ color: 'white' }}><BsFillPersonPlusFill /></IconContext.Provider>
                    <h3 className='default-label'>Brethren Requests</h3>
                </div>
                <div>
                    {
                        friendRequests.map((e, i) => {
                            return <FriendRequest key={i} from_user={e} to_user={user} />
                        })
                    }
                </div>

            </div>

            <div className='middle-board'>
                <div className='prayer-request'>
                    <h2 className='default-label'>Make a Prayer Request</h2>
                    <div className='yourprayer-title'>
                        <p className='default-label'>Title</p>
                        <input className='default-input' onChange={(event) => setTitle(event.target.value)} />
                    </div>
                    <div className='yourprayer-description'>
                        <p className='default-label'>Description</p>
                        <textarea className='default-input' onChange={(event) => setDescription(event.target.value)} />
                    </div>
                    <button onClick={sendPrayerRequest} className='default-btn send-btn'>
                        <div className='send-icon'>
                            <IconContext.Provider value={{ color: '#573519', size: '14px', marginTop: '10px' }}><RiSendPlaneFill /></IconContext.Provider>
                        </div>
                        Send
                    </button>
                </div>

                <div className='prayer-requests'>
                    <h2 className='default-label'>Prayer Requests From Your Brethren</h2>
                    <div className='their-requests'>
                        {
                            prayerRequests.map((e, i) => {
                                return <PrayerRequest request={e} showPrayerInfo={showPrayerInfo} />
                            })
                        }
                    </div>
                </div>
            </div>


            <div className='saved-verses'>
                <h2 className='default-label'>Saved Verses</h2>
                {
                    savedVerses.map((e, i) => {
                        return <ListItem key={i} heading={e.heading} text={e.content} click={() => navigate.push(`/memorize/${e.id}`)} />
                    })
                }
            </div>
        </div>
    );
}

function ListItem({ heading, text, click }) {
    var textLength = 100;

    if (text.length > textLength)
        return (
            <div className='item-container' onClick={click}>
                <h3 className='default-label'>{heading}</h3>
                <p className='default-label'>{text.substring(0, textLength) + '...'}</p>
            </div>
        )

    return (
        <div className='item-container' onClick={click}>
            <h3 className='default-label'>{heading}</h3>
            <p className='default-label'>{text}</p>
        </div>
    )
}

function FriendRequest({ from_user, to_user }) {
    const answerRequest = async (answer, from_user) => {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/friends-request/${to_user.id}`,
            {
                data: {
                    "from_user_id": from_user.id,
                    "answer": answer ? 'accept' : 'decline'
                },
                headers: {
                    'Api-Key': process.env.REACT_APP_SERVER_API_KEY
                }
            }
        )

        console.log(response)
    }

    return (
        <div className='request-container'>
            <h3 className='default-label'>Brethren Request From:</h3>
            <p className='default-label'>{from_user.username}</p>

            <div className='request-buttons'>
                <button className='default-btn accept' onClick={() => answerRequest(true, from_user)}>Accept</button>
                <button className='default-btn decline' onClick={() => answerRequest(false, from_user)}>Decline</button>
            </div>
        </div>
    )
}

function PrayerRequest({ request, showPrayerInfo }) {
    const [from, setFrom] = useState({});

    useEffect(async () => {
        const fromUser = await axios(`${process.env.REACT_APP_SERVER_URL}/api/users/${request.user}`, {
            headers: {
                'Api-Key': process.env.REACT_APP_SERVER_API_KEY
            }
        })

        setFrom(fromUser.data);
    }, [])

    return (
        <div className='prayer-container'>
            <h2 className='default-label'>{from.username}</h2>
            <h3 className='default-label'>{`${from.first_name} ${from.last_name}`}</h3>
            <p className='default-label'>{request.title}</p>
            <button className='default-btn' onClick={() => {
                showPrayerInfo({
                    title: request.title,
                    description: request.description,
                    from: from
                })
            }}>More</button>
        </div>
    )
}

