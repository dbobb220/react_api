import React from 'react';
import './Beers.css';

function Beers(props) {
    return(
        <div className="beer" id={props.id}>
            <img src={props.image} alt={props.image}/>
            <h2>{props.name}</h2>
            <p>{props.tagline}</p>
        </div>
    )
}

export default Beers
