import React from 'react';
import './Review.css';
import Select from "../select/Select";

const Review = () => {
    return (
        <>
            <div className={"review-container"}>
                <h2>Reviews</h2>
                <Select
                    // value={filter.sort}
                    // onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue="Sorting"
                    options={[
                        {value: 'highRating', name: 'high rating'},
                        {value: 'lowRating', name: 'low rating'}
                    ]}
                />
            </div>
        </>
    );
};

export default Review;