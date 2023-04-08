import React from 'react';
import './Card.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import fruits from '../../../assets/fruits.jpg';
import vegetables from '../../../assets/vegetables.jpg';
import drinks from '../../../assets/drinks.jpg';
import meats from '../../../assets/meats.jpg';
import {useTranslation} from "react-i18next";

const Card = ({card, category}) => {
    const {t} = useTranslation();
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

            dispatch({type: 'TOTAL_MONEY', payload: totalMoney + card.price});
        }
    }

    const handleTrashButtonClick = () => {
        dispatch({
            type: 'CART_ITEMS_IDS',
            payload: cartItemsIds.map(id => {
                if (id !== card.id) {
                    return id;
                }
            })
        });
        if (cartItemsNumber === 1) {
            dispatch({type: 'CART_BUTTON_CLICK', payload: false});
        }
        dispatch({type: 'CART_ITEMS_NUMBER', payload: cartItemsNumber - 1});
        dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity - cartItemsIdsAndQuantity.get(card.id)});
        dispatch({type: 'TOTAL_MONEY', payload: totalMoney - cartItemsIdsAndQuantity.get(card.id) * card.price});
        cartItemsIdsAndQuantity.delete(card.id);
        cartItems.delete(card.id);
        dispatch({type: 'CART_ITEMS', payload: cartItems});
        dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
    }

    return (
        <div className={"card"}>
            <Link to={card !== undefined ? `/products/${card.id}` : '/'}
                  style={{textDecoration: "none", color: "black"}}>
                <img
                    className={"card-image"}
                    src={card !== undefined ? card.photo :
                        category === "fruits" ? fruits :
                            category === "vegetables" ? vegetables :
                                category === "drinks" ? drinks : meats}
                    alt={card !== undefined ? card.name : category}
                    style={{width: "100%"}}
                />
                <div className={"container-left"}>
                    <h4>
                        <b>{card !== undefined ? card.name : t('check_out_other') + ' ' + t(category)}</b>
                    </h4>
                    <p>{card !== undefined ? card.price + ' ' + t('tg_kg') : ""}</p>
                </div>
                <div className={category !== undefined ? "hidden" : "container-ratings"}>
                    <div className={"container-ratings"}>
                        {[...Array(card !== undefined ? Math.ceil(card.rating) : 1)].map(() =>
                            <span className="fa fa-star checked"></span>
                        )}
                        {[...Array(5 - (card !== undefined ? Math.ceil(card.rating) : 1))].map(() =>
                            <span className="fa fa-star"></span>
                        )}
                    </div>
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
                                    {t("added")}
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
                                {t("add to cart")}
                            </button>
                        }
                    </>
                    :
                    <Link to={"/category"} state={{category: category}} style={{textDecoration: "none"}}>
                        <button className={"button-cart"}>{t("more")}</button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Card;