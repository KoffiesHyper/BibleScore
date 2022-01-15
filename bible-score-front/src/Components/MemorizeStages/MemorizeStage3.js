import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function MemorizeStage3({ text, nextStage }) {
    const [input, setInput] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useHistory();

    useEffect(() => {
        var temp = text.content;
        var firstWordFound = false;
        var x = 0;
        while (!firstWordFound) {
            if((/[a-zA-Z0-9]/).test(temp[x])){
                setAnswer(temp.substring(x, temp.length));
                firstWordFound = true;
            }

            x++;
        }
    }, [])

    const markAnswer = () => {
        if(input.trim() === answer.trim()) nextStage()
        else alert('Wrong')
    }

    return (
        <div className="memorize-container-inner">
            <div className="passage-info">
                <h2>Step 3: Rewrite the verse</h2>
                <input className="black default-btn" type="button" value="Mark" onClick={markAnswer} />
                <input className="black default-btn" type="button" value="Finish" onClick={markAnswer} />
            </div>
            <div className="passage-box">
                <h2>{text.heading}</h2>
                <textarea placeholder="> Type Here, i.e. In the beginning God created the heaven and the earth." onChange={(event) => setInput(event.target.value)} />
            </div>
        </div>
    );
}