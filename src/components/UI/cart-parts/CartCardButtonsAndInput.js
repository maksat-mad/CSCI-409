import React, {useState} from 'react';
import './CartCardButtonsAndInput.css';
import {useDispatch, useSelector} from "react-redux";

const CartCardButtonsAndInput = ({cardId, maxValue}) => {
    const dispatch = useDispatch();

    const cartItemsNumber = useSelector(state => state.cartItemsNumber);
    const cartItemsIds = useSelector(state => state.cartItemsIds);
    const cartItems = useSelector(state => state.cartItems);
    const cartItemsQuantity = useSelector(state => state.cartItemsQuantity);
    const cartItemsIdsAndQuantity = useSelector(state => state.cartItemsIdsAndQuantity);
    const totalMoney = useSelector(state => state.totalMoney);

    const [value, setValue] = useState(cartItemsIdsAndQuantity.get(cardId));

    const deleteItem = () => {
        dispatch({type: 'CART_ITEMS_IDS',
            payload: cartItemsIds.map(id => {
                if (id !== cardId) {
                    return id;
                }
            }) });
        if (cartItemsNumber === 1) {
            dispatch({type: 'CART_BUTTON_CLICK', payload: false});
        }
        dispatch({type: 'CART_ITEMS_NUMBER', payload: cartItemsNumber - 1});
        cartItems.delete(cardId);
        dispatch({type: 'CART_ITEMS', payload: cartItems});
    }

    const handleInputChange = (event) => {
        if (event.target.value <= 0) {
            dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity - value});
            cartItemsIdsAndQuantity.delete(cardId);
            dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
            dispatch({type: 'TOTAL_MONEY', payload: totalMoney - value * 1000});
            setValue(0);
            deleteItem();
        } else if (event.target.value >= maxValue) {
            dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity - value + maxValue});
            cartItemsIdsAndQuantity.set(cardId, maxValue);
            dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
            dispatch({type: 'TOTAL_MONEY', payload: totalMoney + (maxValue - value) * 1000});
            setValue(maxValue);
        } else {
            dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity - value + +event.target.value});
            cartItemsIdsAndQuantity.set(cardId, +event.target.value);
            dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
            dispatch({type: 'TOTAL_MONEY', payload: totalMoney + (+event.target.value - value) * 1000});
            setValue(+event.target.value);
        }
    }

    const handleMinusClick = () => {
        if (value <= 1) {
            dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity - 1});
            cartItemsIdsAndQuantity.delete(cardId);
            dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
            setValue(0);
            deleteItem();
        } else {
            dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity - 1});
            cartItemsIdsAndQuantity.set(cardId, cartItemsIdsAndQuantity.get(cardId) - 1);
            dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
            setValue(value - 1);
        }
        dispatch({type: 'TOTAL_MONEY', payload: totalMoney - 1000});
    }

    const handlePlusClick = () => {
        if (value >= maxValue) {
            setValue(maxValue);
        } else {
            dispatch({type: 'CART_ITEMS_QUANTITY', payload: cartItemsQuantity + 1});
            cartItemsIdsAndQuantity.set(cardId, cartItemsIdsAndQuantity.get(cardId) + 1);
            dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: cartItemsIdsAndQuantity});
            dispatch({type: 'TOTAL_MONEY', payload: totalMoney + 1000});
            setValue(value + 1);
        }
    }

    return (
        <div className={"buttons-input"}>
            <button
                onClick={handleMinusClick}
                className={"button-cart-card"}>-</button>
            <input
                onChange={handleInputChange}
                value={value}
                className={"cart-input"}
                type="number"
            />
            <button
                onClick={handlePlusClick}
                className={"button-cart-card"}>+</button>
        </div>
    );
};

export default CartCardButtonsAndInput;