import React, {useEffect, useRef, useState} from 'react';
import './Modal.css';
import './LeaveReviewModal.css';

const LeaveReviewModal = ({setIsOpen}) => {
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(null);
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
        <div className="modal">
            <div ref={modalRef} className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                    <h2>Leave Review</h2>
                </div>
                <div className="modal-body">
                    <div>
                        <div className={"container-ratings big-font-size"}>
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return <span
                                    onClick={() => setRating(ratingValue)}
                                    onMouseOver={() => setHover(ratingValue)}
                                    onMouseOut={() => setHover(null)}
                                    className={"fa fa-star " + ((ratingValue <= (hover || rating)) ? "checked" : "")}></span>;
                            })}
                        </div>
                        <textarea className={"medium-font-size"} rows={"10"} cols={"50"}></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveReviewModal;