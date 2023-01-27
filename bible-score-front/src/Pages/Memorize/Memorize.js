import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import './Memorize.css';
import '../../App.css'
import Options from "../../Components/Options/Options";
import PassageFinder from "../../Components/Passage/Passage";
import { FaVolumeUp } from 'react-icons/fa';
import { IconContext } from "react-icons";
import MemorizeStage1 from "../../Components/MemorizeStages/MemorizeStage1";
import MemorizeStage2 from "../../Components/MemorizeStages/MemorizeStage2";
import MemorizeStage3 from "../../Components/MemorizeStages/MemorizeStage3";
import ProgressBar from "../../Components/MemorizeStages/ProgressBar";
import MemorizeResult from "../../Components/MemorizeStages/MemorizeResult";
import Dropdown from "../../Components/Dropdown/Dropdown";

export default function Memorize({ s, saveVerse }) {
    const [stage, setStage] = useState(s)
    const [book, setBook] = useState('GEN')
    const [chapter, setChapter] = useState('1')
    const [verse, setVerse] = useState('1')
    const [bookOptions, setBookOptions] = useState([]);
    const [chapterOptions, setChapterOptions] = useState([]);
    const [verseOptions, setVerseOptions] = useState([]);
    const [text, setText] = useState({});
    const [loading, setLoading] = useState(true);
    const [finalAttempt, setFinalAttempt] = useState({});

    const navigate = useHistory();

    const { value } = useParams();

    useEffect(async () => {
        if (stage !== 0) {
            const finder = new PassageFinder(value.split('.')[0], value.split('.')[1], value.split('.')[2]);
            setText(await finder.getVerse());
        }
    }, []);

    useEffect(async () => {
        if (stage === 0) {
            updateBookOptions();
            updateChapterOptions();
            updateVerseOptions();
        }
    }, [book, chapter, verse]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [bookOptions, chapter, verseOptions])

    const updateBookOptions = async () => {
        const finder = new PassageFinder(book, chapter, verse);
        const array1 = await finder.getBooks();
        setBookOptions(array1);
    }

    const updateChapterOptions = async () => {
        const finder = new PassageFinder(book, chapter, verse);
        const array2 = await finder.getChapters();
        array2.shift();
        setChapterOptions(array2);
    }

    const updateVerseOptions = async () => {
        const finder = new PassageFinder(book, chapter, verse);
        const array3 = await finder.getVerses();
        array3.shift();
        setVerseOptions(array3);
    }



    switch (stage) {
        case 0:
            return (
                <div className="memorize-form-container">
                    <div className="verse-container-outer">
                        {loading &&
                            <div className="loading-indicator">

                            </div>
                        }
                        {!loading &&
                            <div className="verse-container-inner">
                                <h2 className="default-label">Choose a verse</h2>
                                <h3>Book</h3>
                                <Dropdown items={bookOptions} updateVal={setBook} />
                                <h3>Chapter</h3>
                                <Dropdown items={chapterOptions} updateVal={setChapter} />
                                <h3>Verse</h3>
                                <Dropdown items={verseOptions} updateVal={setVerse} />
                                <input className="default-btn" type="button" value="Proceed" onClick={async () => {
                                    navigate.push(`/memorize/${book}.${chapter}.${verse}`);
                                }} />
                            </div>
                        }
                    </div>
                </div>
            );
            break;
        case 1:
            return (
                <div className="stage-container">
                    <ProgressBar barAnim='toRead' />
                    <MemorizeStage1 nextStage={() => setStage(2)} text={text} />
                </div>
            );
            break;
        case 2:
            return (
                <div className="stage-container">
                    <ProgressBar barAnim='toFill' />
                    <MemorizeStage2 nextStage={() => setStage(3)} text={text} />
                </div>
            );
            break;
        case 3:
            return (
                <div className="stage-container">
                    <ProgressBar barAnim='toRewrite' />
                    <MemorizeStage3 nextStage={() => setStage(4)} text={text} updateFinalAttempt={setFinalAttempt} />
                </div>
            );
            break;
        case 4:
            return (
                <MemorizeResult text={text} finalAttempt={finalAttempt} saveVerse={saveVerse} />
            );
            break;
        default:
    }
}
