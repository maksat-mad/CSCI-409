import React, {useState} from 'react';
import './Ratings.css';
import LeaveReviewModal from "../modal/LeaveReviewModal";
import {useTranslation} from "react-i18next";

const LeaveReview = ({productId}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const {t} = useTranslation();

    const openModal = () => {
        setModalOpen(true);
    }

    return (
        <>
            <div className={"button-container"}>
            <span onClick={openModal}>
                <div className={"ratings-button leave-review-button"}>
                    {t('leave_review')}
                </div>
            </span>
            </div>
            {modalOpen && <LeaveReviewModal productId={productId} setIsOpen={setModalOpen}/>}
        </>
    );
};

export default LeaveReview;