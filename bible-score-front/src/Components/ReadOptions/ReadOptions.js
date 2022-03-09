import React from "react";
import './ReadOptions.css';
import Options from '../Options/Options';

export default function ReadOptions({
    bookOptions, 
    chapterOptions, 
    changeBook, 
    changeChapter,
    highlightSavedVerses,
    setColumns,
    setVerseSelected
}) {
    return (
        <div className='options-container'>
            <div>
                <h2>Book</h2>
                <select className="default-select" onChange={changeBook}>
                    <Options array={bookOptions} />
                </select>
            </div>

            <div>
                <h2>Chapter</h2>
                <select className="default-select" onChange={changeChapter}>
                    <Options array={chapterOptions} />
                </select>
            </div>

            <div className="column-options">
                <div className="column-options">
                    <input className="default-btn" type='button' value='|' onClick={() => {
                        setTimeout(() => {
                            highlightSavedVerses()
                        }, 10)
                        setColumns(1);
                        setVerseSelected(false)
                    }}></input>
                    <input className="default-btn" type='button' value='||' onClick={() => {
                        setTimeout(() => {
                            highlightSavedVerses()
                        }, 10)
                        setColumns(2);
                        setVerseSelected(false)
                    }}></input>
                </div>
            </div>
        </div>
    );
}