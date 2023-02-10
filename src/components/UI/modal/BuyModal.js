import React, {useEffect, useRef, useState} from 'react';
import './Modal.css';
import './LeaveReviewModal.css';
import Error from '../error/Error';
import Loader from "../loader/Loader";
import {useSelector} from "react-redux";
import BuyService from "../../../service/buy/BuyService";

const BuyModal = ({setIsOpen, tel}) => {
    const modalRef = useRef();

    const cartItemsIdsAndQuantity = useSelector(state => state.cartItemsIdsAndQuantity);

    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isClearCart, setIsClearCart] = useState(false);

    const [error, setError] = useState('');

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
                productId: productId,
                quantity: quantity
            }
            products.push(productToBuy);
        });

        const body = {
            products: products,
            tel: tel
        };

        (async function postBuy() {
            await BuyService.postBuy(body)
                .then(() => {
                    setIsSuccess(true);
                    // clearCart();
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
                    <h2>Buy Products</h2>
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
                                    <h3>Thank you for your purchase, our representative will contact you shortly</h3>
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