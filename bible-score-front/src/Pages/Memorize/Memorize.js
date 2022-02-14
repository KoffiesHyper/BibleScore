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

export default function Memorize({ s }) {
    const [stage, setStage] = useState(s)
    const [book, setBook] = useState('GEN')
    const [chapter, setChapter] = useState('1')
    const [verse, setVerse] = useState('1')
    const [bookOptions, setBookOptions] = useState([]);
    const [chapterOptions, setChapterOptions] = useState([]);
    const [verseOptions, setVerseOptions] = useState([]);
    const [text, setText] = useState({});
    const [barAnim, setBarAnim] = useState('toRead');

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

    const updateBookOptions = async () => {
        const finder = new PassageFinder(book, chapter, verse);
        const array1 = await finder.getBooks();
        setBookOptions(array1);
    }

    const updateChapterOptions = async () => {
        const finder = new PassageFinder(book, chapter, verse);
        const array2 = await finder.getChapters();
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
                        <div className="verse-container-inner">
                            <h2 className="default-label">Choose a verse</h2>
                            <h3>Book</h3>
                            <select className="default-select" onChange={(event) => setBook(event.target.value)}>
                                <Options array={bookOptions} />
                            </select>
                            <h3>Chapter</h3>
                            <select className="default-select" onChange={(event) => setChapter(event.target.value)}>
                                <Options array={chapterOptions} />
                            </select>
                            <h3>Verse</h3>
                            <select className="default-select" onChange={(event) => setVerse(event.target.value)}>
                                <Options array={verseOptions} />
                            </select>
                            <input className="default-btn" type="button" value="Proceed" onClick={async () => {
                                navigate.push(`/memorize/${book}.${chapter}.${verse}`);
                            }} />
                        </div>
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
                    <MemorizeStage3 nextStage={() => setStage(4)} text={text} />
                </div>
            );
            break;
            case 4:
                return (
                    <div className="stage-container">
                        <ProgressBar barAnim='toFinish' />
                        <h1>{`${text.heading} - Finished`}</h1>
                    </div>
                );
                break;
        default:
    }
}
