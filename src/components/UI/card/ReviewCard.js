import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({name, rating, comment}) => {
    return (
        <div className={"review-card"}>
            <div>
                <div className={"review-name-rating"}>
                    <h3>{name}</h3>
                    <div className={"container-ratings"}>
                        {[...Array(rating)].map(() =>
                            <span className="fa fa-star checked"></span>
                        )}
                        {[...Array(5 - rating)].map(() =>
                            <span className="fa fa-star"></span>
                        )}
                    </div>
                </div>
                {comment}
            </div>
        </div>
    );
};

export default ReviewCard;