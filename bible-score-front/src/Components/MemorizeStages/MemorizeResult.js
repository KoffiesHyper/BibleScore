import React, { useEffect, useState } from "react";
import './MemorizeResult.css';
import ProgressBar from "./ProgressBar";
import { IconContext } from "react-icons/lib";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { BiBible } from "react-icons/bi";
import { useHistory } from "react-router-dom";

export default function MemorizeResult({ text, finalAttempt, saveVerse }) {
    const [score, setScore] = useState(0);
    const history = useHistory();

    useEffect(() => {
        var numWordCorrect = 0;
        finalAttempt.input.split(' ').map((e, i) => {
            if (e == finalAttempt.answer.split(' ')[i]) numWordCorrect++;
        });
        setScore(Math.round(numWordCorrect / (finalAttempt.answer.split(' ').length - 1) * 100));
    }, [])

    return (
        <div className="stage-container">
            <ProgressBar barAnim='toFinish' />
            <div>
                <div className="result-box">
                    <h1 className="default-label">{`Memorization Review - ${text.heading}`}</h1>
                    <div className="vertical-line"></div>
                    <h2 className="default-label">Your Answer</h2><p className="default-label">{`Accuracy: ${score}%`}</p>
                    <div className="passage-box">
                        {
                            finalAttempt.input.split(' ').map((e, i) => {
                                var resultForWord = (e == finalAttempt.answer.split(' ')[i]);

                                return <span style={{
                                    marginRight: '5px',
                                    backgroundColor: resultForWord ? '#ccffa6' : '#ffa6a6',
                                    borderRadius: '2px',
                                    color: 'black',
                                    padding: '2px'
                                }}>{` ${e} `}</span>
                            })
                        }
                    </div>
                    <div className="vertical-line"></div>
                    <h2 className="default-label">Correct Answer</h2>
                    <div className="passage-box">
                        {finalAttempt.answer}
                    </div>
                </div>
                <div className="result-buttons">
                    <button className='default-btn left-btn' onClick={() => saveVerse(`${text.id}#64cee6`)}>
                        Save Verse
                        <div style={{ marginLeft: '4px', marginTop: '1px' }}>
                            <IconContext.Provider value={{ color: 'var(--tertiary-color)', size: '15px' }}><RiSendPlaneFill /></IconContext.Provider>
                        </div>
                    </button>
                    <button className='default-btn left-btn' onClick={() => window.location.reload()}>
                        Try Again
                        <div style={{ marginLeft: '4px', marginTop: '1px' }}>
                            <IconContext.Provider value={{ color: 'var(--tertiary-color)', size: '15px' }}><BsArrowCounterclockwise /></IconContext.Provider>
                        </div>
                    </button>
                    <button className='default-btn right-btn' onClick={() => history.push('/memorize')}>
                        Choose Another Verse
                        <div style={{ marginLeft: '4px', marginTop: '1px' }}>
                            <IconContext.Provider value={{ color: 'var(--tertiary-color)', size: '15px' }}><BiBible /></IconContext.Provider>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}