import React from 'react';
import './Card.css';

const Card = ({image, name, price, buttonText}) => {
    return (
        <div className={"card"}>
            <img className={"card-image"} src={image} alt={name} style={{width: "100%"}}/>
            <div className={"container-left"}>
                <h4><b>{name}</b></h4>
                <p>{price}</p>
            </div>
            <div className={"container"}>
                <button className={"button-buy"}>{buttonText}</button>
            </div>
        </div>
    );
};

export default Card;