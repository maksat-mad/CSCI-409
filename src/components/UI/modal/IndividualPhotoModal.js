import React, {useEffect, useRef} from 'react';
import './Modal.css';

const IndividualPhotoModal = ({setIsOpen, picture}) => {
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
        <div className={"modal"}>
            <div ref={modalRef} className="modal-content">
                <img style={{width: "100%", height: "100%"}} src={picture} alt={"full product picture"}/>
            </div>
        </div>
    );
};

export default IndividualPhotoModal;