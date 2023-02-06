import React from 'react';
import './Card.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import fruits from '../../../assets/fruits.jpg';
import vegetables from '../../../assets/vegetables.jpg';
import drinks from '../../../assets/drinks.jpg';
import meats from '../../../assets/meats.jpg';

const Card = ({card, category}) => {
    const dispatch = useDispatch();

    const cartItemsNumber = useSelector(state => state.cartItemsNumber);
    const cartItemsIds = useSelector(state => state.cartItemsIds);
    const cartItems = useSelector(state => state.cartItems);
    const cartItemsQuantity = useSelector(state => state.cartItemsQuantity);
    const cartItemsIdsAndQuantity = useSelector(state => state.cartItemsIdsAndQuantity);
    const totalMoney = useSelector(state => state.totalMoney);

    const handleButtonClick = () => {
        dispatch({type: 'CART_BUTTON_CLICK', payload: true});
        if (!cartItemsIds.includes(card.id)) {
            dispatch({type: 'CART_ITEMS_NUMBER', payload: cartItemsNumber + 1});
            dispatch({type: 'CART_ITEMS_IDS', payload: [...cartItemsIds, card.id]});

            cartItems.set(card.id, card);
            dispatch({type: 'CART_ITEMS', payload: cartItems});

            dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity + 1});

            cartItemsIdsAndQuantity.set(card.id, 1);
            dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});

            dispatch({type: 'TOTAL_MONEY', payload: totalMoney + 1000});
        }
    }

    const handleTrashButtonClick = () => {
        dispatch({type: 'CART_ITEMS_IDS',
            payload: cartItemsIds.map(id => {
                if (id !== card.id) {
                    return id;
                }
            }) });
        if (cartItemsNumber === 1) {
            dispatch({type: 'CART_BUTTON_CLICK', payload: false});
        }
        dispatch({type: 'CART_ITEMS_NUMBER', payload: cartItemsNumber - 1});
        dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity - cartItemsIdsAndQuantity.get(card.id)});
        dispatch({type: 'TOTAL_MONEY', payload: totalMoney - cartItemsIdsAndQuantity.get(card.id) * 1000});
        cartItemsIdsAndQuantity.delete(card.id);
        cartItems.delete(card.id);
        dispatch({type: 'CART_ITEMS', payload: cartItems});
        dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
    }

    return (
        <div className={"card"}>
            <img
                className={"card-image"}
                src={card !== undefined ? card.url :
                    category === "fruits" ? fruits :
                        category === "vegetables" ? vegetables :
                            category === "drinks" ? drinks : meats}
                alt={card !== undefined ? card.title.split(' ').slice(0, 1).join('') : category}
                style={{width: "100%"}}
            />
            <Link to={card !== undefined ? `/products/${card.id}` : '/'} style={{textDecoration: "none", color:"black"}}>
                <div className={"container-left"}>
                    <h4>
                        <b>{card !== undefined ? card.title.split(' ').slice(0, 1).join('') : "Check out other " + category}</b>
                    </h4>
                    <p>{card !== undefined ? "320 tg/kg" : ""}</p>
                </div>
                <div className={category !== undefined ? "hidden" : "container-ratings"}>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </div>
            </Link>
            <div className={"container"}>
                {category === undefined ?
                    <>
                        {cartItemsIds.includes(card.id) ?
                            <>
                                <button
                                    className={"button-cart cart-added"}
                                >
                                    {"added"}
                                </button>
                                <span
                                    onClick={handleTrashButtonClick}
                                    className={"fa fa-trash trash-icon-cart"}></span>
                            </>
                            :
                            <button
                                onClick={handleButtonClick}
                                className={"button-cart"}
                            >
                                {"add to cart"}
                            </button>
                        }
                    </>
                    :
                    <Link to={"/category"} state={{category: category}} style={{textDecoration: "none"}}>
                        <button className={"button-cart"}>{"more"}</button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Card;