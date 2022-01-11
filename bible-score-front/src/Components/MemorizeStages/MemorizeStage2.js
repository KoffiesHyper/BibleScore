import React, { useEffect, useState } from "react";
import './MemorizeStage2.css';
import '../../App.css';

export default function MemorizeStage2({ text, nextStage }) {
    const [alteredText, setAlteredText] = useState([]);
    const [blankWords, setBlankWords] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [colors, setColors] = useState([]);
    const [answered, setAnswered] = useState(false);

    useEffect(() => {
        createBlanks();
    }, []);

    useEffect(() => {
        answers.length = blankWords.length;
    }, [blankWords]);

    const createBlanks = () => {
        var words = text.content.split(" ");
        words.pop();

        const numGaps = Math.floor(words.length / 5);
        const blanks = [];

        for (let i = 0; i < numGaps; i++) {
            const random = Math.floor(Math.random() * ((words.length - 1) - 0) + 0);

            if (blanks.includes(words[random]) || words[random] === '*') i--
            else {
                blanks.push({ index: random, word: words[random] });
                words[random] = '*';
            }
        }

        blanks.sort((a, b) => {
            return a.index - b.index;
        });
        setBlankWords(blanks);

        const parts = words.join(' ').split('*');
        setAlteredText(parts);
    }

    const markAnswers = () => {
        console.log(answers);
        console.log(blankWords);

        var tempAns = [];

        answers.forEach((e, i) => {
            if (e === blankWords[i].word) tempAns.push(true)
            else tempAns.push(false)
        });

        setColors(tempAns);
        setAnswered(true);
    }

    var x = -1;

    return (
        <div className="memorize-container-inner">
            <div className="passage-info">
                <h2>Step 2: Fill in the blanks</h2>
                <input className="black default-btn" defaultValue='Mark' type='button' onClick={markAnswers} />
                <input className="default-btn" defaultValue='Next Stage' type='button' onClick={nextStage} />
            </div>
            <div className="passage-box">
                <h2>{text.heading}</h2>
                {
                    alteredText.map((e, i) => {
                        if (i === alteredText.length - 1) return <>{e}</>
                        else {
                            x++;

                            if (answered)
                                return (
                                    <>
                                        {e}
                                        <input
                                            className={colors[x] ? 'blank correct' : 'blank incorrect'}
                                            type='text'
                                            style={{ 'width': blankWords[x].word.length * 13 }}
                                            onChange={(event) => {
                                                var array = answers;
                                                array[i] = event.target.value;
                                                setAnswers(array);
                                            }}
                                        />
                                    </>
                                );
                            else
                                return (
                                    <>
                                        {e}
                                        <input
                                            className={'blank'}
                                            type='text'
                                            style={{ 'width': blankWords[x].word.length * 13 }}
                                            onChange={(event) => {
                                                var array = answers;
                                                array[i] = event.target.value;
                                                setAnswers(array);
                                            }}
                                        />
                                    </>
                                )
                        }
                    })
                }
            </div>
        </div>
    );
}