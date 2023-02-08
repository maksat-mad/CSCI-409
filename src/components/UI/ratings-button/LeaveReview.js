import React, {useState} from 'react';
import './Ratings.css';
import LeaveReviewModal from "../modal/LeaveReviewModal";

const LeaveReview = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    return (
        <>
            <div className={"button-container"}>
            <span onClick={openModal}>
                <div className={"ratings-button leave-review-button"}>
                    Leave review
                </div>
            </span>
            </div>
            {modalOpen && <LeaveReviewModal setIsOpen={setModalOpen}/>}
        </>
    );
};

export default LeaveReview;