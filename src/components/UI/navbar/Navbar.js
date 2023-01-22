import React, {useState} from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import menu from '../../../assets/UI/menu.svg';
import category from '../../../assets/UI/angle-double-down.svg';
import DropDown from "../drop-down/DropDown";
import Modal from "../modal/Modal";
import languages from "../../utils/languages";
import cities from "../../utils/cities";
import { useAuth } from "../../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isCategoryOpened, setIsCategoryOpened] = useState(false);
    const [isModalLangOpen, setIsModalLangOpen] = useState(false);
    const [isModalCityOpen, setIsModalCityOpen] = useState(false);

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

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
                    type="text" id="search" name="search" placeholder={"Search"}/>
                <button className={"nav-button"} onClick={() => setIsModalCityOpen(true)}>Astana</button>
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
                    <img src={category} alt={"category"}/>
                </button>
                <button className={"mob-button"} onClick={menuClick}>
                    <img src={menu} alt={"menu"}/>
                </button>
            </nav>
            {isCategoryOpened &&
                <div className={"menu"}>
                    <div className={"menu-buttons"}>
                        <Link to={"/search"} state={{ category: "fruits" }}>
                            Fruits
                        </Link>
                        <Link to={"/search"} state={{ category: "vegetables" }}>
                            Vegetables
                        </Link>
                        <Link to={"/search"} state={{ category: "drinks" }}>
                            Drinks
                        </Link>
                        <Link to={"/search"} state={{ category: "meats" }}>
                            Meats
                        </Link>
                    </div>
                </div>
            }
            {isMenuOpened &&
                <div className={"menu"}>
                    <input type="text" id="search2" name="search" placeholder={"Search"}/>
                    <div className={"menu-buttons"}>
                        <button className={"nav-button"} onClick={() => setIsModalCityOpen(true)}>Astana</button>
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
        </header>
    );
};

export default Navbar;