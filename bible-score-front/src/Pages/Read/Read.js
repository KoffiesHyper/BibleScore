import React from "react";
import { useState, useEffect } from "react";
import './Read.css';
import '../../App.css';
import axios from "axios";
import Options from "../../Components/Options/Options";
import PassageFinder from "../../Components/Passage/Passage";
import { BiBrain, BiHighlight } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { IoMdClose } from "react-icons/io";
import { useHistory } from "react-router-dom";

export default function Read({ user, saveVerse }) {
    const [book, setBook] = useState('GEN');
    const [chapter, setChapter] = useState('1');
    const [verse, setVerse] = useState('All');
    const [bookOptions, setBookOptions] = useState([]);
    const [chapterOptions, setChapterOptions] = useState([]);
    const [verseOptions, setVerseOptions] = useState(['All']);
    const [heading, setHeading] = useState('Genesis 1');
    const [columns, setColumns] = useState(1);
    const [passage, setPassage] = useState('');
    const [splitVerses, setSplitVerses] = useState([]);
    const [verseSelected, setVerseSelected] = useState(false);
    const [selectedVerse, setSelectedVerse] = useState();
    const [highlightColor, setHighlightColor] = useState('rgb(0,0,0)');

    const navigate = useHistory();

    useEffect(async () => {
        updateBookOptions();
        updateChapterOptions();
        updateVerseOptions();
        updatePassage();
    }, [book, chapter, verse]);

    useEffect(() => {
        const finder = new PassageFinder();
        const verses = finder.splitPassageByVerse(passage);
        setSplitVerses(verses);

        setTimeout(() => {
            highlightSavedVerses();
        }, 1000)
    }, [passage]);

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
        setVerseOptions(array3);
    }

    const updatePassage = async () => {
        if (verse === 'All') {
            const finder = new PassageFinder(book, chapter, verse);
            const p = await finder.getChapter();
            setHeading(p.heading)
            setPassage(p.content);
        }
        else {
            const finder = new PassageFinder(book, chapter, verse);
            const p = await finder.getVerse();
            setHeading(p.heading)
            setPassage(p.content);
        }
    }

    const changeBook = (event) => {
        setBook(event.target.value);
    }

    const changeChapter = (event) => {
        setChapter(event.target.value);
    }

    const changeVerse = (event) => {
        setVerse(event.target.value);
    }

    const splitPassage = (part) => {
        var x = Math.floor(splitVerses.length / 2);

        if (part === 1) {
            return splitVerses.slice(0, x);
        }
        else if (part === 2) {
            return splitVerses.slice(x, splitVerses.length);
        }
    }

    const highlightSavedVerses = () => {
        if (user) {
            const saved_verses = user.saved_verses;
            for (let i = 0; i < saved_verses.length; i++) {
                const splitted = saved_verses[i].split('.');
                const b = splitted[0];
                const c = splitted[1];
                const v = splitted[2];

                if (b === book && c === chapter) {
                    const toBeHighlighted = document.getElementById(v - 1);
                    toBeHighlighted.style.backgroundColor = highlightColor;
                }
            }
        }
        else {

        }
    }

    const underlineVerse = (i) => {
        const text = document.getElementById(i);

        if (verseSelected) return

        setSelectedVerse(i);
        if (text.style.textDecoration.includes('underline')) {
            return;
        }
        else {
            text.style.textDecoration = 'underline dotted white';
            if (!verseSelected) setVerseSelected(true)
        }
    }

    const cancelVerse = () => {
        const text = document.getElementById(selectedVerse);
        text.style.textDecoration = 'none';
        const verseMenu = document.getElementById('verseMenu');
        verseMenu.style.animationName = 'popDown';

        setTimeout(() => {
            setVerseSelected(false);
        }, 500);
    }

    const highlightVerse = () => {
        const text = document.getElementById(selectedVerse);
        text.style.backgroundColor = highlightColor;
        // const color = highlightColor.substring(4, highlightColor.length - 1).split(',');
        // console.log(color);

        function hexToRgbNew(hex) {
            var arrBuff = new ArrayBuffer(4);
            var vw = new DataView(arrBuff);
            vw.setUint32(0, parseInt(hex, 16), false);
            var arrByte = new Uint8Array(arrBuff);

            return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
        }

        var c = hexToRgbNew(highlightColor.substring(1, highlightColor.length)).split(',');
        const r = c[0];
        const g = c[1];
        const b = c[2];

        const hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );

        if(hsp > 140) text.style.color = 'black'
        else text.style.color = 'white'

        // saveVerse(`${book}.${chapter}.${selectedVerse + 1}`)
    }

    const redirectToMemorize = () => {
        navigate.push(`/memorize/${book}.${chapter}.${selectedVerse + 1}`)
    }

    if (columns === 1 || verse !== 'All') {
        return (
            <div className='outer-container'>
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

                    <div>
                        <h2>Verse</h2>
                        <select className="default-select" onChange={changeVerse}>
                            <Options array={verseOptions} />
                        </select>
                    </div>

                    <div className="column-options">
                        <input className="default-btn" type='button' value='|' onClick={() => { setColumns(1); setVerseSelected(false) }}></input>
                        <input className="default-btn" type='button' value='||' onClick={() => { setColumns(2); setVerseSelected(false) }}></input>
                    </div>
                </div>
                <div className='text-container' style={{ 'width': '25vw' }}>
                    <h1>{heading}</h1>
                    <div>
                        {
                            splitVerses.map((e, i) =>
                                <span
                                    key={i}
                                    id={i}
                                    className="verse"
                                    onClick={() => underlineVerse(i)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {e}
                                </span>)
                        }
                    </div>

                </div>
                {verseSelected &&
                    <div id="verseMenu" className="verse-menu">
                        <input type='color' value={highlightColor} onChange={(event) => setHighlightColor(event.target.value)}></input>
                        <button className="default-btn" onClick={highlightVerse}><IconContext.Provider value={{ color: 'white' }}><BiHighlight size='15px' className="icon" /></IconContext.Provider><span>Highlight</span></button>
                        <button className="default-btn" onClick={redirectToMemorize}><IconContext.Provider value={{ color: 'white' }}><BiBrain size='15px' className="icon" /></IconContext.Provider><span>Memorize</span></button>
                        <button className="cancel-btn" onClick={cancelVerse}><IconContext.Provider value={{ color: 'red' }}><IoMdClose size='26px' /></IconContext.Provider></button>
                    </div>
                }
            </div>
        );
    }
    else if (columns == 2 && verse === 'All') {
        const versesInColOne = splitPassage(1).length;
        return (
            <div className='outer-container'>
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

                    <div>
                        <h2>Verse</h2>
                        <select className="default-select" onChange={changeVerse}>
                            <Options array={verseOptions} />
                        </select>
                    </div>

                    <div className="column-options">
                        <input className="default-btn" type='button' value='|' onClick={() => setColumns(1)}></input>
                        <input className="default-btn" type='button' value='||' onClick={() => setColumns(2)}></input>
                    </div>
                </div>
                <div className='text-container' style={{ 'width': '80vw' }}>
                    <h1>{heading}</h1>
                    <div className='text-columns'>
                        <div className='text-column'>
                            <div>
                                {
                                    splitPassage(1).map((e, i) =>
                                        <span
                                            key={i}
                                            id={i}
                                            className="verse"
                                            onClick={() => underlineVerse(i)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {e}
                                        </span>)
                                }
                            </div>
                        </div>
                        <div className='line'>
                        </div>
                        <div className='text-column'>
                            <div>
                                {
                                    splitPassage(2).map((e, i) =>
                                        <span
                                            key={i + versesInColOne}
                                            id={i + versesInColOne}
                                            className="verse"
                                            onClick={() => underlineVerse(i + versesInColOne)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {e}
                                        </span>)
                                }
                            </div>
                        </div>
                        {verseSelected &&
                            <div id="verseMenu" className="verse-menu">
                                <input type='color' value={highlightColor} onChange={(event) => setHighlightColor(event.target.value)}></input>
                                <button className="default-btn" onClick={highlightVerse}><IconContext.Provider value={{ color: 'white' }}><BiHighlight size='15px' className="icon" /></IconContext.Provider><span>Highlight</span></button>
                                <button className="default-btn" onClick={redirectToMemorize}><IconContext.Provider value={{ color: 'white' }}><BiBrain size='15px' className="icon" /></IconContext.Provider><span>Memorize</span></button>
                                <button className="cancel-btn" onClick={cancelVerse}><IconContext.Provider value={{ color: 'red' }}><IoMdClose size='26px' /></IconContext.Provider></button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}