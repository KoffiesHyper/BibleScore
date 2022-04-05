import React, { useEffect, useState } from "react";
import './Brethren.css';
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import axios from "axios";

export default function Brethren({ user, friendRequests }) {
    const [input, setInput] = useState('Nice');
    const [results, setResults] = useState([{}]); 
    const [noResult, setNoResult] = useState(true);    

    const searchUser = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/search/${input}`,
            {
                headers: {
                    'Api-Key': process.env.REACT_APP_SERVER_API_KEY
                }
            })

        if(response.data.length == 0){
            setNoResult(true);
        }
        else{
            setResults(response.data);
            setNoResult(false);
        }
    }

    const sendFriendRequest = async (to_user) => {
        const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/friends-request/${user.id}`, {"id": `${to_user.id}`},
            {
                headers: {
                    'Api-Key': process.env.REACT_APP_SERVER_API_KEY
                }
            })
    }

    return (
        <div className="brethren-container">
            <div className="search-container">
                <h2 className="default-label" >Brethren</h2>
                <div className="search-settings">
                    <input className="default-input" placeholder="Enter a brother's username" onChange={(event) => setInput(event.target.value)} />
                    <button className="default-btn" onClick={searchUser} ><IconContext.Provider value={{ color: 'white' }}><FaSearch /></IconContext.Provider></button>
                </div>
            </div>
            {!noResult &&
                <div className="user-results">
                    {
                        results.map((e, i) => {
                            return (
                                <div className="user-result" key={i}>
                                    <div className="user-labels">
                                        <h3 className="default-label">{e.username}</h3>
                                        <p className="default-label">{`${e.first_name} ${e.last_name}`}</p>
                                    </div>
                                    <button className="default-btn" onClick={() => sendFriendRequest(e)}>Send Brethren Request</button>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {noResult &&
                <h2 className="default-label">No brethren found</h2>
            }
        </div>
    );
}