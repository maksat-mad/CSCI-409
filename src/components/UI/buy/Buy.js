import React, {useState} from 'react';
import '../card/Card.css';
import '../card/ReviewCard.css';
import '../ratings-button/Ratings.css';
import './Buy.css';
import shopping from '../../../assets/UI/shopping.png';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import BuyModal from "../modal/BuyModal";

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const prohibitedIndexes = [6, 10, 13];

const Buy = () => {
    const cartItemsIdsAndQuantity = useSelector(state => state.cartItemsIdsAndQuantity);
    const totalMoney = useSelector(state => state.totalMoney);
    const cartItems = useSelector(state => state.cartItems);

    const [tel, setTel] = useState('+7(7');
    const [error, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const handleInputChange = (event) => {
        setError(false);
        if (event.target.value.length > 16) {
            return;
        }
        const res = ['+', '7', '(', '7', '', '', ')', '', '', '', '-', '', '', '-', '', ''];
        let index = 4, start = 0;
        if (event.target.value.substring(0, 4) === '+7(7') {
            start = 4;
        }
        event.target.value.substring(start).split('').forEach(value => {
            if (digits.includes(value)) {
                index += prohibitedIndexes.includes(index) ? 1 : 0;
                res[index++] = value;
            }
        });
        setTel(res.slice(0, index).join(''));
    }

    const handleSubmit = () => {
        let pattern = /^\+([0-9])\(([0-9]{3})\)([0-9]{3})(-)([0-9]{2})(-)([0-9]{2})$/;
        if (tel.match(pattern)) {
            setModalOpen(true);
        } else {
            setError(true);
        }
    }

    return (
        <div>
            {cartItems.size !== 0 ?
                <>
                    <div className={"container"}>
                        <h2>Products to buy</h2>
                    </div>
                    <div className={"container"}>
                        <div className={"review-card"}>
                            <div>
                                {[...cartItems].map(([id, card], index) => {
                                    return <div className={"container-buy-items"}>
                                        <p style={{fontWeight: 'bold'}}>{index + 1}) Item</p>
                                        <div className={"buy-items-content"}>
                                            <div> One item cost: {1000} tg</div>
                                            <div> Number of items: {cartItemsIdsAndQuantity.get(id)}</div>
                                            <div>Total cost: {cartItemsIdsAndQuantity.get(id) * 1000} tg</div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={"container"} style={{marginTop: '-50px'}}>
                        <div>
                            <h3>Total cost = {totalMoney}</h3>
                            <input
                                onChange={handleInputChange}
                                value={tel}
                                placeholder={"+7(705)555-55-55"}
                                className={"buy-items-phone-input"}
                                type={"tel"}
                            />
                            <div className={"button-container"}>
                            <span onClick={handleSubmit}>
                                <div className={"ratings-button buy-button"}>
                                    Buy
                                </div>
                            </span>
                            </div>
                            {error &&
                                <div className={"input-error"}>
                                    (!) Invalid phone number.<br/>Format: +7(705)555-55-55
                                </div>
                            }
                        </div>
                    </div>
                    {modalOpen && <BuyModal setIsOpen={setModalOpen} tel={tel}/>}
                </>
                :
                <>
                    <div className={"cart-container"}>
                        <h2>No items to buy</h2>
                    </div>
                    <div className={"cart-container"}>
                        <img src={shopping} alt={"shopping"} style={{height: "300px"}}/>
                    </div>
                    <div className={"cart-container"}>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <h2>Go to the main</h2>
                        </Link>
                    </div>
                </>
            }
        </div>
    );
};

export default Buy;