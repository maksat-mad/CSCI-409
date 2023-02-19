import React, {useState} from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import menu from '../../../assets/UI/options.png';
import category from '../../../assets/UI/app.png';
import DropDown from "../drop-down/DropDown";
import Modal from "../modal/Modal";
import languages from "../../utils/languages";
import cities from "../../utils/cities";
import {useAuth} from "../../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import CartButton from "../cart-button/CartButton";
import {useTranslation} from "react-i18next";
import cookies from "js-cookie";

const Navbar = () => {
    const {t} = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isCategoryOpened, setIsCategoryOpened] = useState(false);
    const [isModalLangOpen, setIsModalLangOpen] = useState(false);
    const [isModalCityOpen, setIsModalCityOpen] = useState(false);

    const selectedCity = useSelector(state => state.city);
    const cartButton = useSelector(state => state.cartButtonClick);

    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        dispatch({type: 'UPDATE_NAVBAR_INPUT', payload: event.target.value});
    }

    const menuClick = () => {
        if (isCategoryOpened === true) {
            setIsCategoryOpened(false);
        }
        setIsMenuOpened(!isMenuOpened);
    }

    const categoryClick = () => {
        if (isMenuOpened === true) {
            setIsMenuOpened(false);
        }
        setIsCategoryOpened(!isCategoryOpened);
    }

    const goToLogin = () => {
        navigate('/login');
    }

    const goToProfile = () => {
        navigate('profile');
    }

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch {
            console.error("Failed to log out");
        }
    }

    return (
        <header>
            <nav>
                <Link to={"/"}>
                    <img src={logo} alt={"logo"}/>
                </Link>
                <DropDown/>
                <input
                    onChange={handleInputChange} value={inputValue}
                    type="text" id="search" name="search"
                    placeholder={t('search')} autoComplete={"off"}
                />
                <img
                    onClick={() => setIsModalLangOpen(true)}
                    className={"country country-flag"}
                    src={currentLanguage.src}
                    alt={currentLanguage.name}
                />
                <button className={"nav-button"} onClick={() => setIsModalCityOpen(true)}>{t(selectedCity)}</button>
                {currentUser ?
                    <>
                        <button className={"nav-button"} onClick={goToProfile}>{t('profile')}</button>
                        <button className={"nav-button"} onClick={handleLogout}>{t('logout')}</button>
                    </>
                    :
                    <button className={"nav-button"} onClick={goToLogin}>{t('login')}</button>
                }
                <button className={"mob-button"} onClick={categoryClick}>
                    <img src={category} alt={"category"} style={{width: "35px", height: "35px"}}/>
                </button>
                <button className={"mob-button"} onClick={menuClick}>
                    <img src={menu} alt={"menu"} style={{width: "35px", height: "35px"}}/>
                </button>
            </nav>
            {isCategoryOpened &&
                <div className={"menu"}>
                    <div className={"menu-buttons"}>
                        <Link to={"/category"} state={{category: "fruits"}}>
                            {t('fruits')}
                        </Link>
                        <Link to={"/category"} state={{category: "vegetables"}}>
                            {t('vegetables')}
                        </Link>
                        <Link to={"/category"} state={{category: "drinks"}}>
                            {t('drinks')}
                        </Link>
                        <Link to={"/category"} state={{category: "meats"}}>
                            {t('meats')}
                        </Link>
                    </div>
                </div>
            }
            {isMenuOpened &&
                <div className={"menu"}>
                    <input
                        onChange={handleInputChange} value={inputValue}
                        type="text" id="search2" name="search"
                        placeholder={t('search')} autoComplete={"off"}
                    />
                    <div className={"menu-buttons"}>
                        <button className={"nav-button"}
                                onClick={() => setIsModalCityOpen(true)}>{t(selectedCity)}</button>
                        <img
                            onClick={() => setIsModalLangOpen(true)}
                            className={"country-flag"}
                            src={currentLanguage.src}
                            alt={currentLanguage.name}
                        />
                        {currentUser ?
                            <>
                                <button className={"nav-button"} onClick={goToProfile}>{t('profile')}</button>
                                <button className={"nav-button"} onClick={handleLogout}>{t('logout')}</button>
                            </>
                            :
                            <button className={"nav-button"} onClick={goToLogin}>{t('login')}</button>
                        }
                    </div>
                </div>
            }
            {isModalLangOpen &&
                <Modal setIsOpen={setIsModalLangOpen} values={languages} from={"language"}/>
            }
            {isModalCityOpen &&
                <Modal setIsOpen={setIsModalCityOpen} values={cities} from={"city"}/>
            }
            {cartButton && <CartButton/>}
        </header>
    );
};

export default Navbar;