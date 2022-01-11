import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function MemorizeStage3({ text }) {
    const [input, setInput] = useState('');

    const navigate = useHistory();

    const markAnswer = () => {
        if(input.trim().length !== text.content.trim().length) return alert('Wrong')

        input.trim().split('').forEach((e, i) => {
            if(e !== text.content[i]) return alert('Wrong')
        });

        navigate.push('/');
    }

    return (
        <div className="memorize-container-inner">
            <div className="passage-info">
                <h2>Step 3: Rewrite the entire verse</h2>
                <input className="black default-btn" type="button" value="Finish" onClick={markAnswer} />
            </div>
            <div className="passage-box">
                <h2>{text.heading}</h2>
                <textarea placeholder="> Type Here" onChange={(event) => setInput(event.target.value)} />
            </div>
        </div>
    );
}