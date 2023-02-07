import React from 'react';
import './Review.css';
import Select from "../select/Select";
import ReviewCard from "../card/ReviewCard";
import LoadMore from "../ratings-button/LoadMore";

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
            <div className={"review-container"}>
                <div>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <ReviewCard/>
                    <LoadMore/>
                </div>
            </div>
        </>
    );
};

export default Review;