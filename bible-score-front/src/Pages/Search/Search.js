import React, { useState, useEffect } from "react";
import './Search.css';
import { useHistory, useParams } from "react-router-dom";
import PassageFinder from "../../Components/Passage/Passage";
import SearchResultItem from "../../Components/SearchResultItem/SearchResultItem";

export default function Search({ kw }) {
    const [results, setResults] = useState([]);
    const [keyword, setKeyword] = useState(kw);
    const [params, setParams] = useState(useParams());

    useEffect(async () => {
        setKeyword(params.keyword);
    }, [params]);

    useEffect(async () => {
        const finder = new PassageFinder();
        const response = await finder.getKeywordSearch(keyword);
        setResults(response)
    }, [keyword])

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