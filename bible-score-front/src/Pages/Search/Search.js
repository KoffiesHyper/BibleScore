import React, { useState, useEffect } from "react";
import './Search.css';
import { useParams } from "react-router-dom";
import PassageFinder from "../../Components/Passage/Passage";
import SearchResultItem from "../../Components/SearchResultItem/SearchResultItem";

export default function Search() {
    const [results, setResults] = useState([]);
    const { keyword } = useParams();

    useEffect(async () => {
        const finder = new PassageFinder();
        const response = await finder.getKeywordSearch(keyword);
        setResults(response)
    }, [])

    return (
        <div className="results-container">
            <div>
                <h1>{`Results for '${keyword}'`}</h1>
                {
                    results.map((e, i) => {
                        return <SearchResultItem key={i} result={e} />
                    })
                }
            </div>
        </div>
    );
}