import React from 'react';
import './VerseMenu.css';
import { IconContext } from 'react-icons/lib';
import { BiHighlight, BiBrain } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

export default function VerseMenu({ highlightColor, highlightVerse, setHighlightColor, redirectToMemorize, cancelVerse }) {
    return (
        <div id="verseMenu" className="verse-menu">
            <input type='color' value={highlightColor} onChange={(event) => {setHighlightColor(event.target.value)}}></input>
            <button className="default-btn" onClick={highlightVerse}><IconContext.Provider value={{ color: 'white' }}><BiHighlight size='15px' className="icon" /></IconContext.Provider><span>Highlight</span></button>
            <button className="default-btn" onClick={redirectToMemorize}><IconContext.Provider value={{ color: 'white' }}><BiBrain size='15px' className="icon" /></IconContext.Provider><span>Memorize</span></button>
            <button className="cancel-btn" onClick={cancelVerse}><IconContext.Provider value={{ color: 'red' }}><IoMdClose size='26px' /></IconContext.Provider></button>
        </div>
    )
}