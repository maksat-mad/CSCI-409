import React from 'react';
import './Ratings.css';

const LeaveReview = () => {
    const openModal = () => {
        console.log("open modal");
    }

    return (
        <div className={"button-container"}>
            <span onClick={openModal}>
                <div className={"ratings-button leave-review-button"}>
                    Leave review
                </div>
            </span>
        </div>
    );
};

export default LeaveReview;