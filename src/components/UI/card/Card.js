import React from 'react';
import './Card.css';
import {Link} from "react-router-dom";

const Card = ({image, name, price, buttonText, category}) => {

    return (
        <div className={"card"}>
            <img className={"card-image"} src={image} alt={name} style={{width: "100%"}}/>
            <div className={"container-left"}>
                <h4><b>{name}</b></h4>
                <p>{price}</p>
            </div>
            <div className={price === '' ? "hidden" : "container-ratings"}>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
            </div>
            <div className={"container"}>
                {category === undefined ?
                    // <Link to={"/category"} state={{category: category}} style={{textDecoration: "none"}}>
                    //     <button className={"button-cart"}>{buttonText}</button>
                    // </Link>
                    <button className={"button-cart"}>{buttonText}</button>
                    :
                    <Link to={"/category"} state={{category: category}} style={{textDecoration: "none"}}>
                        <button className={"button-cart"}>{buttonText}</button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Card;