import React, {useEffect, useState} from 'react';
import './Review.css';
import Select from "../select/Select";
import ReviewCard from "../card/ReviewCard";
import LoadMore from "../ratings-button/LoadMore";
import {useFetching} from "../../../hook/useFetching";
import CardService from "../../../service/main/CardService";

const Review = ({productId}) => {
    const limit = 5;

    const [reviews, setReviews] = useState([]);
    const [reviewsToShow, setReviewsToShow] = useState([]);
    const [sort, setSort] = useState('');
    const [showLoadMore, setShowLoadMore] = useState(true);

    const [totalReviews, setTotalReviews] = useState(0);
    const [numberOfShownComments, setNumberOfShownComments] = useState(5);

    const [fetchReviews, isReviewsLoading, reviewsError] = useFetching(async () => {
        const response = await CardService.getReviewsByProductId(productId);
        setReviews([...response.data]);
        setTotalReviews([...response.data].length);
        setReviewsToShow([...[...response.data].slice(0, limit)]);
        setShowLoadMore([...response.data].length > limit);
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        setReviewsToShow([...reviewsToShow, ...reviews.slice(reviewsToShow.length, numberOfShownComments)]);
        if (numberOfShownComments >= totalReviews) {
            setShowLoadMore(false);
        }
    }, [numberOfShownComments]);

    return (
        <>
            <div className={"review-container"}>
                <h2>Reviews</h2>
                <Select
                    value={sort}
                    onChange={selectedSort => setSort(selectedSort)}
                    defaultValue="Sorting"
                    options={[
                        {value: 'highRating', name: 'high rating'},
                        {value: 'lowRating', name: 'low rating'}
                    ]}
                />
            </div>
            <div className={"review-container"}>
                <div>
                    {reviewsToShow.map(review => {
                        return <ReviewCard key={review.id} name={"Maksat"} rating={3} comment={review.body} />
                    })}
                    {showLoadMore &&
                        <LoadMore limit={limit} num={numberOfShownComments} shownComments={setNumberOfShownComments}/>
                    }
                </div>
            </div>
        </>
    );
};

export default Review;