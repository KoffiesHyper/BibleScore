import React from "react";
import './SearchResultItem.css';

export default function SearchResultItem({ result }){
    return(
        <div className="result-container">
            <h2>{result.reference}</h2>
            <p>{result.text}</p>
        </div>
    );
}