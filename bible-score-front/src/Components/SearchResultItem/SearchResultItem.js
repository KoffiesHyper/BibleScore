import React from "react";
import { useHistory } from "react-router-dom";
import './SearchResultItem.css';

export default function SearchResultItem({ result }){

    const history = useHistory();

    return(
        <div className="result-container" onClick={() => {
            history.push(`/memorize/${result.id}`);
        }}>
            <h2>{result.reference}</h2>
            <p>{result.text}</p>
        </div>
    );
}