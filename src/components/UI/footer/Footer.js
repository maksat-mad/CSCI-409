import React from 'react';
import './Footer.css';
import logo from '../../../assets/logo.png';
import telegram from '../../../assets/social-media/telegram.svg';
import whatsapp from '../../../assets/social-media/whatsapp.svg';
import instagram from '../../../assets/social-media/instagram.svg';
import youtube from '../../../assets/social-media/youtube.svg';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <Link to={"/"}>
                <img src={logo} alt={"logo"}/>
            </Link>
            <div className={"footer-content"}>
                Astana, Kazakhstan<br/>Phone: +7 705 100 10 10<br/>help@naturalgoods.com
            </div>
            <div className={"links"}>
                <a href={"https://telegram.org/"} target={"_blank"} rel={"noreferrer"}>
                    <img src={telegram} alt={"telegram"}/>
                </a>
                <a href={"https://www.whatsapp.com/"} target={"_blank"} rel={"noreferrer"}>
                    <img src={whatsapp} alt={"whatsapp"}/>
                </a>
                <a href={"https://www.instagram.com/"} target={"_blank"} rel={"noreferrer"}>
                    <img src={instagram} alt={"instagram"}/>
                </a>
                <a href={"https://www.youtube.com/"} target={"_blank"} rel={"noreferrer"}>
                    <img src={youtube} alt={"youtube"}/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;