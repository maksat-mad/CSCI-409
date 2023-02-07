import React from 'react';
import './ReviewCard.css';

const ReviewCard = () => {
    return (
        <div className={"review-card"}>
            <div>
                <div className={"review-name-rating"}>
                    <h3>Aibek</h3>
                    <div className={"container-ratings"}>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                    </div>
                </div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </div>
        </div>
    );
};

export default ReviewCard;