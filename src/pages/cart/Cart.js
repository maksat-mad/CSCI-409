import React, {useEffect, useState} from 'react';
import CartCard from "../../components/UI/card/CartCard";
import {useSelector} from "react-redux";
import shopping from '../../assets/UI/shopping.png';
import {Link} from "react-router-dom";
import './Cart.css';
import CartBuyButton from "../../components/UI/cart-parts/CartBuyButton";
import {useAuth} from "../../context/AuthContext";
import LoginToProceed from "../../components/UI/cart-parts/LoginToProceed";
import CartBuyBottom from "../../components/UI/cart-parts/CartBuyBottom";
import {useTranslation} from "react-i18next";

const Cart = () => {
    const {t} = useTranslation();
    const {currentUser} = useAuth();

    const [items, setItems] = useState([]);

    const cartButton = useSelector(state => state.cartButtonClick);
    const cartItems = useSelector(state => state.cartItems);
    const cartItemsNumber = useSelector(state => state.cartItemsNumber);
    const cartItemsQuantity = useSelector(state => state.cartItemsQuantity);
    const totalMoney = useSelector(state => state.totalMoney);

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/cart');
    }, []);

    useEffect(() => {
        setItems(Array.from(cartItems.values()));
    }, [cartItemsNumber]);

    return (
        <>
            {cartButton ?
                <div>
                    <div className={"cart-container-title"}>
                        <h2>{t('number_of_items')} = {cartItemsQuantity}</h2>
                        <h2>{t('total_cost')} = {totalMoney} tg</h2>
                    </div>
                    <div className={"cart-container"}>
                        <div>{items.map(item => {
                            return <CartCard key={item.id} card={item}
                                             more_info={t('more_info')}
                                             one_item={t('one_item')}
                                             total={t('total')}
                                             tg={t('tg')}
                            />
                        })}
                        </div>
                        {currentUser ?
                            <>
                                {currentUser.role === 'user' &&
                                    <>
                                        <CartBuyButton tg={t('tg')} money={totalMoney}/>
                                        <CartBuyBottom message={t('buy')} tg={t('tg')} money={totalMoney}/>
                                    </>
                                }
                            </>
                            :
                            <LoginToProceed text={t('login_to_buy')}/>
                        }
                    </div>
                </div>
                :
                <>
                    <div className={"cart-container"}>
                        <h2>{t('cart_is_empty')}</h2>
                    </div>
                    <div className={"cart-container"}>
                        <img src={shopping} alt={"shopping"} style={{height: "300px"}}/>
                    </div>
                    <div className={"cart-container"}>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <h2>{t('go_main')}</h2>
                        </Link>
                    </div>
                </>
            }
        </>
    );
};

export default Cart;