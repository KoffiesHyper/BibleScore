import React from "react";
import './MemorizeStage1.css';
import { IconContext } from "react-icons";
import { FaVolumeUp } from "react-icons/fa";
import '../../App.css';

export default function MemorizeStage1({ text, nextStage }) {

    const getVoices = () => {
        return new Promise(
            function (resolve, reject) {
                var tts = window.speechSynthesis;
                var id;

                id = setInterval(() => {
                    if (tts.getVoices().length !== 0) {
                        clearInterval(id)
                        resolve(tts.getVoices());
                    }
                }, 10);
            }
        );
    }

    const speakVerse = async () => {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text.content.substring(1, text.content.length);
        const voices = await getVoices();
        utterance.voice = voices[2];
        speechSynthesis.speak(utterance);
    }

    return (
        <div className="memorize-container-inner">
            <div className="passage-info">
                <h2>Step 1: Read the verse until memorized</h2>
                <div className='speak-button' onClick={speakVerse}>
                    <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
                        <div>
                            <FaVolumeUp size='20px' />
                        </div>
                    </IconContext.Provider>
                </div>
                <input className="default-btn" type="button" value="Next Stage" onClick={nextStage} />
            </div>
            <div className="passage-box">
                <h2>{text.heading}</h2>
                {text.content}
            </div>
        </div>
    );
}