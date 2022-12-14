import React, {useState} from 'react';
import './Navbar.css';
import logo from '../../../assets/logo.png';
import menu from '../../../assets/menu.svg';
import DropDown from "../drop-down/DropDown";

const Navbar = () => {
    const [isOpened, setIsOpened] = useState(false);

    const buttonClick = () => {
        setIsOpened(!isOpened);
    }

    return (
        <header>
            <nav>
                <img src={logo} alt={"logo"}/>
                <DropDown/>
                <input type="text" id="search" name="search" placeholder={"Search"}/>
                <a href={"/App/"}>Astana</a>
                <a href={"/App/"}>English</a>
                <a href={"/App/"}>Sign In</a>
                <button onClick={buttonClick}>
                    <img src={menu} alt={"menu"}/>
                </button>
            </nav>
            {isOpened &&
                <div className={"menu"}>
                    <input type="text" id="search" name="search" placeholder={"Search"}/>
                    <div className={"menu-buttons"}>
                        <a href={"/App/"}>Astana</a>
                        <a href={"/App/"}>English</a>
                        <a href={"/App/"}>Sign In</a>
                    </div>
                </div>
            }
        </header>
    );
};

export default Navbar;