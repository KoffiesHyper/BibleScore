import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PassageFinder from '../../Components/Passage/Passage';
import './Dashboard.css';

export default function Dashboard({ user, savedVerses }) {
    const navigate = useHistory();

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
            <div className='prayer-requests'>
                <h2 className='default-label'>Social</h2>
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

