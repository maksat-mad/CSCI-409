import React from 'react';
import './Ratings.css';

const LoadMore = () => {
    return (
        <div className={"button-container"}>
            <span>
                <div className={"ratings-button load-more-button"}>
                    Load More
                </div>
            </span>
        </div>
    );
};

export default LoadMore;