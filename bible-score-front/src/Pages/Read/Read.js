import React from "react";
import { useState, useEffect } from "react";
import './Read.css';
import '../../App.css';
import axios from "axios";
import Options from "../../Components/Options/Options";
import PassageFinder from "../../Components/Passage/Passage";

export default function Read() {
    const [book, setBook] = useState('GEN');
    const [chapter, setChapter] = useState('1');
    const [verse, setVerse] = useState('All');
    const [bookOptions, setBookOptions] = useState([]);
    const [chapterOptions, setChapterOptions] = useState([]);
    const [verseOptions, setVerseOptions] = useState(['All']);
    const [heading, setHeading] = useState('Genesis 1');
    const [columns, setColumns] = useState(1);
    const [passage, setPassage] = useState('');
    const [underline, setUnderline] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        updateBookOptions();
        updateChapterOptions();
        updateVerseOptions();
        updatePassage();
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
        setVerseOptions(array3);
    }

    const updatePassage = async() => {
        setPassage('...Loading')
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
        var x = Math.floor(passage.length / 2);
        var spliceIndex = 0;

        for (let i = x; i < passage.length; i++) {
            if (passage[i] === ' ') {
                spliceIndex = i;
                break;
            }
        }

        if (part === 1) {
            return passage.substring(0, spliceIndex);
        }
        else if (part === 2) {
            return passage.substring(spliceIndex, passage.length - 1);
        }
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
                        <input className="default-btn" type='button' value='|' onClick={() => setColumns(1)}></input>
                        <input className="default-btn" type='button' value='||' onClick={() => setColumns(2)}></input>
                    </div>
                </div>
                <div className='text-container' style={{ 'width': '25vw' }}>
                    <h1>{heading}</h1>
                    <span onClick={() => setUnderline(!underline)}><p style={{textDecoration: underline ? 'underline' : 'none'}}>{passage}</p></span>
                </div>
            </div>
        );
    }
    else if (columns == 2 && verse === 'All') {
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
                            <p>{splitPassage(1)}</p>
                        </div>
                        <div className='line'>
                        </div>
                        <div className='text-column'>
                            <p>{splitPassage(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}