import React, {useEffect, useState} from 'react';
import './Review.css';
import Select from "../select/Select";
import ReviewCard from "../card/ReviewCard";
import LoadMore from "../ratings-button/LoadMore";
import {useFetching} from "../../../hook/useFetching";
import CardService from "../../../service/main/CardService";
import Loader from "../loader/Loader";
import NotFound from "../not-found/NotFound";
import Error from '../error/Error';
import {useTranslation} from "react-i18next";

const Review = ({productId}) => {
    const {t} = useTranslation();
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

    useEffect(() => {
        switch (sort) {
            case 'highRating':
                setReviews([...reviews.sort((a, b) => b.id - a.id)]);
                setReviewsToShow([...reviews.sort((a, b) => b.id - a.id).slice(0, numberOfShownComments)]);
                break;
            case 'lowRating':
                setReviews([...reviews.sort((a, b) => a.id - b.id)]);
                setReviewsToShow([...reviews.sort((a, b) => a.id - b.id).slice(0, numberOfShownComments)]);
        }
    }, [sort]);

    return (
        <>
            <div className={"review-container"}>
                <h2>{t('reviews')}</h2>
                <Select
                    value={sort}
                    onChange={selectedSort => setSort(selectedSort)}
                    defaultValue={t('sorting')}
                    options={[
                        {value: 'highRating', name: t('high_rating')},
                        {value: 'lowRating', name: t('low_rating')}
                    ]}
                />
            </div>
            <div className={"review-container"}>
                <div>
                    {reviewsError && <Error message={reviewsError}/>}
                    {isReviewsLoading && <div><Loader/></div>}
                    {!isReviewsLoading && !reviewsError && reviewsToShow.length === 0 &&
                        <NotFound message={t("no_product")}/>
                    }
                    {reviewsToShow.map(review => {
                        return <ReviewCard key={review.id} name={"Maksat"} rating={3} comment={review.body}/>
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