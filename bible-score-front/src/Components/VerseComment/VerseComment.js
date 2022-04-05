import React, { useEffect, useState } from "react";
import './VerseComment.css';
import { IconContext } from "react-icons/lib";
import { MdThumbDown, MdThumbUp } from "react-icons/md";


export default function VerseComment({ comment }) {
    const [daysSince, setDaysSince] = useState(0);

    useEffect(() => {
        var dateCommented = new Date(comment.comment_date);
        var dateToday = new Date;
        var daysInBetween = Math.round((dateToday - dateCommented.getTime()) / (1000 * 3600 * 24));
        setDaysSince(daysInBetween);
    }, [])

    return (
        <div className="verse-comment">
            <h2>{comment.user ? `${comment.user.username}` : ''}<span>{`(${(daysSince != 0) ? `${daysSince} days ago` : 'Today'})`}</span></h2>
            <p>{comment.comment}</p>
            <div className="verse-comment-votes">
                <button className='default-btn' >
                    <div className='send-icon'>
                        <IconContext.Provider value={{ color: 'var(--tertiary-color)', size: '15px', marginTop: '10px' }}><MdThumbUp /></IconContext.Provider>
                    </div>
                </button>
                <button className='default-btn'>
                    <div className='send-icon'>
                        <IconContext.Provider value={{ color: 'var(--tertiary-color)', size: '15px', marginTop: '10px' }}><MdThumbDown /></IconContext.Provider>
                    </div>
                </button>
            </div>
        </div>
    );
}