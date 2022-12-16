import React from 'react';
import './Main.css';
import main from '../../../assets/main.jpg';

const Main = () => {
    return (
        <div className={"container"}>
            <div className={"main-image"}>
                <img src={main} alt={"main"} />
            </div>
        </div>
    );
};

export default Main;