import React, {useState} from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import menu from '../../../assets/UI/menu.svg';
import category from '../../../assets/UI/angle-double-down.svg';
import DropDown from "../drop-down/DropDown";

const Navbar = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isCategoryOpened, setIsCategoryOpened] = useState(false);

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

    // const displayLangModel = () => {
    //     console.log("Open lang model");
    // }

    return (
        <header>
            <nav>
                <img src={logo} alt={"logo"}/>
                <DropDown/>
                <input type="text" id="search" name="search" placeholder={"Search"}/>
                <a href={"/App/"}>Astana</a>
                <a href={"/App/"}>English</a>
                <a href={"/App/"}>Sign In</a>
                <button onClick={categoryClick}>
                    <img src={category} alt={"category"}/>
                </button>
                <button onClick={menuClick}>
                    <img src={menu} alt={"menu"}/>
                </button>
            </nav>
            {isCategoryOpened &&
                <div className={"menu"}>
                    <div className={"menu-buttons"}>
                        <a href={"/App/"}>Fruits</a>
                        <a href={"/App/"}>Vegetables</a>
                        <a href={"/App/"}>Drinks</a>
                        <a href={"/App/"}>Meats</a>
                    </div>
                </div>
            }
            {isMenuOpened &&
                <div className={"menu"}>
                    <input type="text" id="search" name="search" placeholder={"Search"}/>
                    <div className={"menu-buttons"}>
                        <a href={"/App/"}>Astana</a>
                        <a href={"/App/"}>English</a>
                        <a href={"/App/"}>Sign In</a>
                    </div>
                </div>
            }
            {/*<Modal/>*/}
        </header>
    );
};

export default Navbar;