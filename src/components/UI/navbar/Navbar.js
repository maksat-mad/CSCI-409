import React, {useEffect, useState} from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import menu from '../../../assets/UI/options.png';
import category from '../../../assets/UI/app.png';
import DropDown from "../drop-down/DropDown";
import Modal from "../modal/Modal";
import languages from "../../utils/languages";
import cities from "../../utils/cities";
import { useAuth } from "../../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import CartButton from "../cart-button/CartButton";

const Navbar = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isCategoryOpened, setIsCategoryOpened] = useState(false);
    const [isModalLangOpen, setIsModalLangOpen] = useState(false);
    const [isModalCityOpen, setIsModalCityOpen] = useState(false);
    const [city, setCity] = useState('Astana');

    const selectedCity = useSelector(state => state.city);
    const cartButton = useSelector(state => state.cartButtonClick);

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setCity(selectedCity);
    }, [selectedCity]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        dispatch({ type: 'UPDATE_NAVBAR_INPUT', payload: event.target.value });
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
                    placeholder={"Search"} autoComplete={"off"}
                />
                <button className={"nav-button"} onClick={() => setIsModalCityOpen(true)}>{city}</button>
                <button className={"nav-button"} onClick={() => setIsModalLangOpen(true)}>English</button>
                {currentUser ?
                    <>
                        <button className={"nav-button"} onClick={goToProfile}>My Profile</button>
                        <button className={"nav-button"} onClick={handleLogout}>Log Out</button>
                    </>
                    :
                    <button className={"nav-button"} onClick={goToLogin}>Log In</button>
                }
                <button className={"mob-button"} onClick={categoryClick}>
                    <img src={category} alt={"category"} style={{width:"35px", height:"35px"}}/>
                </button>
                <button className={"mob-button"} onClick={menuClick}>
                    <img src={menu} alt={"menu"} style={{width:"35px", height:"35px"}}/>
                </button>
            </nav>
            {isCategoryOpened &&
                <div className={"menu"}>
                    <div className={"menu-buttons"}>
                        <Link to={"/category"} state={{ category: "fruits" }}>
                            Fruits
                        </Link>
                        <Link to={"/category"} state={{ category: "vegetables" }}>
                            Vegetables
                        </Link>
                        <Link to={"/category"} state={{ category: "drinks" }}>
                            Drinks
                        </Link>
                        <Link to={"/category"} state={{ category: "meats" }}>
                            Meats
                        </Link>
                    </div>
                </div>
            }
            {isMenuOpened &&
                <div className={"menu"}>
                    <input
                        onChange={handleInputChange} value={inputValue}
                        type="text" id="search2" name="search"
                        placeholder={"Search"} autoComplete={"off"}
                    />
                    <div className={"menu-buttons"}>
                        <button className={"nav-button"} onClick={() => setIsModalCityOpen(true)}>{city}</button>
                        <button className={"nav-button"} onClick={() => setIsModalLangOpen(true)}>English</button>
                        {currentUser ?
                            <>
                                <button className={"nav-button"} onClick={goToProfile}>My Profile</button>
                                <button className={"nav-button"} onClick={handleLogout}>Log Out</button>
                            </>
                            :
                            <button className={"nav-button"} onClick={goToLogin}>Log In</button>
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