import React, {useEffect, useRef} from 'react';
import './Modal.css';
import './LeaveReviewModal.css';
import '../ratings-button/Ratings.css';

const AreYouSureModal = ({setIsOpen, yes, no, areYouSure, setIsChange, isChange}) => {
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

    const handleNoClick = () => {
        setIsOpen(false);
    }

    const handleYesClick = () => {
        setIsChange(!isChange);
        handleNoClick();
    }

    return (
        <div className="modal">
            <div ref={modalRef} className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={handleNoClick}>&times;</span>
                    <h2>{areYouSure}</h2>
                </div>
                <div className="modal-body">
                    <div>
                        <div className={"container-review"}>
                            <div className={"button-container"}>
                                <span onClick={handleYesClick}>
                                    <div className={"ratings-button red-button"}>
                                        {yes}
                                    </div>
                                </span>
                            </div>
                            <div className={"button-container"}>
                                <span onClick={handleNoClick}>
                                    <div className={"ratings-button leave-review-button"}>
                                        {no}
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreYouSureModal;