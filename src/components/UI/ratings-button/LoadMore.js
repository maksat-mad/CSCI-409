import React from 'react';
import './Ratings.css';

const LoadMore = ({num, limit, shownComments}) => {
    return (
        <div className={"button-container"}>
            <span onClick={() => shownComments(num + limit)}>
                <div className={"ratings-button load-more-button"}>
                    Load More
                </div>
            </span>
        </div>
    );
};

export default LoadMore;