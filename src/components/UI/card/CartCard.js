import React from 'react';
import meats from '../../../assets/meats.jpg';
import {Link} from "react-router-dom";
import './Card.css';

const CartCard = () => {

    return (
        <div className={"card-cart"}>
            <div className={"card-cart-content"}>
                <div style={{display:"flex", alignItems:"center", gap: "1rem"}}>
                    <img className={"card-cart-img"} src={meats} alt={"meat photo"}/>
                    <span
                        className={"fa fa-trash trash-icon-cart"}>
                    </span>
                </div>
                <div style={{textAlign:"center"}}>
                    <h2>Meat</h2>
                    <Link>
                        More info...
                    </Link>
                    <div className={"container container-ratings"}>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span style={{marginLeft:"20px"}}>3 reviews</span>
                    </div>
                    <div className={"container"} style={{marginTop:"-35px"}}>
                        <div style={{display:"flex", gap: "0.5rem"}}>
                            <button className={"button-item"}>-</button>
                            <input type={"number"} className={"card-cart-input"} />
                            <button className={"button-item"}>+</button>
                        </div>
                        <h3>1225 tg</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;