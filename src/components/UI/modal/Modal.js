import React, {useEffect, useRef} from 'react';
import './Modal.css';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import languages from "../../utils/languages";

const Modal = ({setIsOpen, values, from}) => {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

    const {t} = useTranslation();

    const selectedCity = useSelector(state => state.city);

    const modalRef = useRef();

    const dispatch = useDispatch();

    const clearCart = () => {
        dispatch({type: 'CART_BUTTON_CLICK', payload: false});
        dispatch({type: 'CART_ITEMS_NUMBER', payload: 0});
        dispatch({type: 'CART_ITEMS_IDS', payload: []});
        dispatch({type: 'CART_ITEMS', payload: new Map()});
        dispatch({type: 'CART_ITEMS_QUANTITY', payload: 0});
        dispatch({type: 'CART_ITEMS_IDS_AND_QUANTITY', payload: new Map()});
        dispatch({type: 'TOTAL_MONEY', payload: 0});
    };

    const handleCityChange = (city) => {
        if (selectedCity !== city) {
            dispatch({type: 'UPDATE_CITY', payload: city});
            clearCart();
        }
        setIsOpen(false);
    }

    const handleLanguageChange = (code) => {
        i18next.changeLanguage(code);
        setIsOpen(false);
    }

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

    useEffect(() => {
        document.title = t('app_title');
    }, [currentLanguage, t]);

    return (
        <div>
            <div className="modal">
                <div ref={modalRef} className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                        <h2>{t(from === "language" ? "choose_language" : "choose_city")}</h2>
                    </div>
                    <div className="modal-body">
                        {from === "language" ?
                            values.map((obj, index) =>
                                <button
                                    className={"modal-button"}
                                    key={index}
                                    onClick={() => handleLanguageChange(obj.code)}
                                >
                                    {obj.name}
                                    <img src={obj.src} alt={obj.name}/>
                                </button>
                            )
                            :
                            values.map((obj, index) =>
                                <button
                                    className={"modal-button"}
                                    key={index}
                                    onClick={() => handleCityChange(obj.name)}
                                >
                                    {t(obj.name)}
                                    <img src={obj.src} alt={obj.name}/>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;