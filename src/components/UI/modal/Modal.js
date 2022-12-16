import React, {useEffect, useRef} from 'react';
import './Modal.css';

const Modal = ({setIsOpen, values, from}) => {
    const modalRef = useRef();

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

    return (
        <div>
            <div className="modal">
                <div ref={modalRef} className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                        <h2>Choose {from}</h2>
                    </div>
                    <div className="modal-body">
                        {from === "language" ?
                            values.map((obj, index) =>
                                <button className={"modal-button"} key={index}>
                                    {obj.name}
                                    <img src={obj.src} alt={obj.name}/>
                                </button>
                            )
                            :
                            values.map((obj, index) =>
                                <button className={"modal-button"} key={index}>
                                    {obj.nameEn}
                                    <img src={obj.src} alt={obj.nameEn}/>
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