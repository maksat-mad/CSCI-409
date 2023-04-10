import React from 'react';
import './ReviewCard.css';
import '../ratings-button/Ratings.css';

const AdminCard = ({card, text, operation, setId, setModalOpen}) => {
    const handleClick = async () => {
        setId(card.email);
        setModalOpen(true);
    }

    return (
        <div className={"review-card"}>
            <div style={{overflowWrap:"anywhere"}}>
                <div className={"review-name-rating"}>
                    <h4>{card.email}</h4>
                    <h4>{card.phone}</h4>
                </div>
                <div className={"container-ratings"} style={{flexWrap: "wrap"}}>
                    <div className={"button-container"}>
                        <span onClick={handleClick}>
                            <div className={"ratings-button " + (operation === 'create' ? 'leave-review-button' : 'red-button')}>
                                {text}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCard;