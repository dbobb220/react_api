import React from 'react';
import './Beers.css';

function Beers(props) {
    return(
        <div className="beer">
            <img src={props.image} alt={props.image}/>
            <h2>{props.name}</h2>
            <p>{props.tagline}</p>
            <button onClick={() => props.likeButton(props.index)}>{props.buttonText}</button>
        </div>
    )
}

export default Beers
