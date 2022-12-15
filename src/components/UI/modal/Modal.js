import React from 'react';
import './Modal.css';
import kazakh from '../../../assets/language/kazakh.png';
import russian from '../../../assets/language/russian.png';
import uk from '../../../assets/language/uk.svg';

const Modal = () => {
    return (
        <div>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close">&times;</span>
                        <h2>Choose language</h2>
                    </div>
                    <div className="modal-body">
                        <a href={"/App/"}>
                            Қазақша
                            <img src={kazakh} alt={"flag of kazakhstan"}/>
                        </a>
                        <a href={"/App/"}>
                            Русский
                            <img src={russian} alt={"flag of russia"}/>
                        </a>
                        <a href={"/App/"}>
                            English
                            <img src={uk} alt={"flag of the uk"}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;