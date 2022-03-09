import React from "react";
import { useState, useEffect } from "react";
import './Read.css';
import '../../App.css';
import axios from "axios";
import Options from "../../Components/Options/Options";
import PassageFinder from "../../Components/Passage/Passage";
import { BiBrain, BiHighlight } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import { IconContext } from "react-icons/lib";
import { IoMdClose } from "react-icons/io";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import { useHistory } from "react-router-dom";
import VerseComment from "../../Components/VerseComment/VerseComment";
import VerseMenu from "../../Components/VerseMenu/VerseMenu";
import ReadOptions from "../../Components/ReadOptions/ReadOptions";

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
    const [highlightColor, setHighlightColor] = useState('rgb(100, 207, 230)');
    const [comments, setComments] = useState([{}]);
    const [loading, setLoading] = useState(true);

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
        }, 300)
    }, [passage]);

    useEffect(async () => {
        if (bookOptions.length > 1 && chapterOptions.length > 1 && verseOptions.length > 1) {
            setTimeout(() => {
                setLoading(false);
            }, 100)
        }
    }, [bookOptions, chapterOptions, verseOptions]);

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
            for (let i = 0; i < verseOptions.length; i++) {
                const toBeCleared = document.getElementById(i);
                if (toBeCleared) {
                    toBeCleared.style.backgroundColor = '';
                    toBeCleared.style.color = '';
                }
            }

            const saved_verses = user.saved_verses;
            for (let i = 0; i < saved_verses.length; i++) {
                const splitted = saved_verses[i].split('.');
                const b = splitted[0];
                const c = splitted[1];
                const v = splitted[2];

                if (b === book && c === chapter) {
                    const toBeHighlighted = document.getElementById(v - 1);
                    if (!toBeHighlighted) return
                    toBeHighlighted.style.backgroundColor = highlightColor;
                    toBeHighlighted.style.color = 'white';
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
            text.style.textDecoration = 'underline dotted var(--tertiary-color)';
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

        if (hsp > 140) text.style.color = 'black'
        else text.style.color = 'white'

        saveVerse(`${book}.${chapter}.${selectedVerse + 1}`)
    }

    const redirectToMemorize = () => {
        navigate.push(`/memorize/${book}.${chapter}.${selectedVerse + 1}`)
    }

    const updateComments = async (v) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/comments/${book}.${chapter}.${v}`, {
                headers: {
                    'Api-Key': process.env.REACT_APP_SERVER_API_KEY
                }
            })

            const data = response.data;

            for await (const e of data) {
                const commentedBy = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${e.commentedBy}`, {
                    headers: {
                        'Api-Key': process.env.REACT_APP_SERVER_API_KEY
                    }
                })
                e.user = commentedBy.data;
            }
            
            setComments(data);
        } catch (err) {
            setComments([]);
        }
    }

    if (columns === 1 || verse !== 'All') {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {loading &&
                    <div className="loading-indicator">
                    </div>
                }
                {!loading &&
                    <div className='outer-container'>
                        <ReadOptions 
                        bookOptions={bookOptions}
                        chapterOptions={chapterOptions}
                        changeBook={changeBook}
                        changeChapter={changeChapter}
                        highlightSavedVerses={highlightSavedVerses}
                        setColumns={setColumns}
                        setVerseSelected={setVerseSelected}
                        />
                        <div className='text-container' style={{ 'width': '25vw' }}>
                            <h1>{heading}</h1>
                            <div>
                                {
                                    splitVerses.map((e, i) =>
                                        <Verse
                                            e={e}
                                            i={i}
                                            comments={comments}
                                            updateComments={updateComments}
                                            highlightSavedVerses={highlightSavedVerses}
                                            underlineVerse={underlineVerse}
                                            book={book}
                                            chapter={chapter}
                                            user={user}
                                            setComments={setComments}
                                        />
                                    )
                                }
                            </div>

                        </div>
                        {verseSelected &&
                            <VerseMenu highlightColor={highlightColor} highlightVerse={highlightVerse} setHighlightColor={setHighlightColor} redirectToMemorize={redirectToMemorize} cancelVerse={cancelVerse} />
                        }
                    </div>
                }
            </div>
        );
    }
    else if (columns == 2 && verse === 'All') {
        const versesInColOne = splitPassage(1).length;
        return (
            <div className='outer-container'>
                <ReadOptions 
                        bookOptions={bookOptions}
                        chapterOptions={chapterOptions}
                        changeBook={changeBook}
                        changeChapter={changeChapter}
                        highlightSavedVerses={highlightSavedVerses}
                        setColumns={setColumns}
                        setVerseSelected={setVerseSelected}
                        />
                <div className='text-container' style={{ 'width': '80vw' }}>
                    <h1>{heading}</h1>
                    <div className='text-columns'>
                        <div className='text-column'>
                            <div>
                                {
                                    splitPassage(1).map((e, i) =>
                                        <Verse
                                            e={e}
                                            i={i}
                                            comments={comments}
                                            updateComments={updateComments}
                                            highlightSavedVerses={highlightSavedVerses}
                                            underlineVerse={underlineVerse}
                                            book={book}
                                            chapter={chapter}
                                            user={user}
                                            setComments={setComments}
                                        />)
                                }
                            </div>
                        </div>
                        <div className='line'>
                        </div>
                        <div className='text-column'>
                            <div>
                                {
                                    splitPassage(2).map((e, i) =>
                                        <Verse
                                            e={e}
                                            i={i + versesInColOne}
                                            comments={comments}
                                            updateComments={updateComments}
                                            highlightSavedVerses={highlightSavedVerses}
                                            underlineVerse={underlineVerse}
                                            book={book}
                                            chapter={chapter}
                                            user={user}
                                            setComments={setComments}
                                        />)
                                }
                            </div>
                        </div>
                        {verseSelected &&
                            <VerseMenu highlightColor={highlightColor} highlightVerse={highlightVerse} setHighlightColor={setHighlightColor} redirectToMemorize={redirectToMemorize} cancelVerse={cancelVerse} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function Verse({ e, i, comments, updateComments, highlightSavedVerses, underlineVerse, book, chapter, user, setComments }) {
    const [expand, setExpand] = useState(false);
    const [newComment, setNewComment] = useState('');

    const writeComment = async (i) => {
        const verseNum = i + 1;

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/comments/${book}.${chapter}.${verseNum}`,
            {
                commentedBy: user.id,
                comment: newComment,
            },
            {
                headers: {
                    'Api-Key': process.env.REACT_APP_SERVER_API_KEY
                }
            })

        let yourComment = response.data;
        yourComment.user = user;

        setComments([yourComment, ...comments]);
    }

    if (expand)
        return (
            <div style={{ paddingBottom: '10px' }}>
                <span key={i} style={{ cursor: 'pointer' }}>
                    <span className="verse-num">{` ${e.num.trim()}`}</span>
                    <span id={i} className="verse" onClick={() => underlineVerse(i)}>{e.text}</span>
                    <button className="verse-actions default-btn" onClick={() => {
                        setTimeout(() => {
                            highlightSavedVerses()
                        }, 10)
                        setExpand(false);
                    }}>
                        <div className="verse-actions-icon">
                            <IconContext.Provider value={{ size: '10px', color: 'white' }}>
                                <FiMoreHorizontal />
                            </IconContext.Provider>
                        </div>
                    </button>
                </span>
                <div className="verse-comments">
                    <div className="verse-comments-own">
                        <input onChange={(event) => setNewComment(event.target.value)} className="default-input" placeholder="Add Your Own Comment" ></input>
                        <button className='default-btn send-btn' onClick={() => writeComment(i)}>
                            <div className='send-icon'>
                                <IconContext.Provider value={{ color: '#573519', size: '17px', marginTop: '10px' }}><RiSendPlaneFill /></IconContext.Provider>
                            </div>
                        </button>
                    </div>
                    {comments &&
                        comments.map((e, i) => {
                            return (
                                <VerseComment comment={e} />
                            )
                        })
                    }
                </div>
            </div>
        )

    return (
        <span
            key={i}
            style={{ cursor: 'pointer' }}
        >
            <span className="verse-num">{` ${e.num.trim()}`}</span>
            <span id={i} className="verse" onClick={() => underlineVerse(i)}>{e.text}</span>
            <button className="verse-actions default-btn" onClick={() => {
                updateComments(i + 1)
                setTimeout(() => {
                    highlightSavedVerses()
                    setExpand(true);
                }, 200)
            }}>
                <div className="verse-actions-icon">
                    <IconContext.Provider value={{ size: '10px', color: 'white' }}>
                        <FiMoreHorizontal />
                    </IconContext.Provider>
                </div>
            </button>
        </span>
    );
}