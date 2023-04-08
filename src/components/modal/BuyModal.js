import React, {useEffect, useRef, useState} from 'react';
import './Modal.css';
import './LeaveReviewModal.css';
import Error from '../error/Error';
import Loader from "../loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import BuyService from "../../service/buy/BuyService";

const BuyModal = ({setIsOpen, tel, buy_products, thank_purchase}) => {
    const modalRef = useRef();
    const dispatch = useDispatch();

    const cartItemsIdsAndQuantity = useSelector(state => state.cartItemsIdsAndQuantity);

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState('');

    const clearCart = () => {
        dispatch({type: 'CART_BUTTON_CLICK', payload: false});
        dispatch({type: 'CART_ITEMS_NUMBER', payload: 0});
        dispatch({type: 'CART_ITEMS_IDS', payload: []});
        dispatch({type: 'CART_ITEMS', payload: new Map()});
        dispatch({type: 'CART_ITEMS_QUANTITY', payload: 0});
        dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: new Map()});
        dispatch({type: 'TOTAL_MONEY', payload: 0});
    };

    useEffect(() => {
        let closeModal = (event) => {
            if (!modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", closeModal);
        return () => {
            document.removeEventListener("mousedown", closeModal);
        };
    });

    useEffect( () => {
        const products = [];
        Array.from(cartItemsIdsAndQuantity).forEach(([productId, quantity]) => {
            const productToBuy = {
                recordId: productId,
                quantity: quantity,
                phoneNumber: tel
            }
            products.push(productToBuy);
        });

        (async function postBuy() {
            await BuyService.postBuy(products)
                .then(() => {
                    setIsSuccess(true);
                    clearCart();
                })
                .catch(error => {
                    setIsError(true);
                    setError(error.message);
                })
                .finally(() => setIsLoading(false));
        })();
    }, []);

    return (
        <div className="modal">
            <div ref={modalRef} className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                    <h2>{buy_products}</h2>
                </div>
                <div className="modal-body">
                    <div>
                        <div className={"container-review"}>
                            {isError && !isLoading && !isSuccess &&
                                <Error message={error}/>
                            }
                            {isLoading && !isError && !isSuccess &&
                                <Loader/>
                            }
                            {isSuccess && !isLoading && !isError &&
                                <div className={"input-success"}>
                                    <h3>{thank_purchase}</h3>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyModal;