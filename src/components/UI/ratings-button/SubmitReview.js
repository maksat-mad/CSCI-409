import React from 'react';
import './Ratings.css';
import ReviewService from "../../../service/review/ReviewService";
import {useTranslation} from "react-i18next";

const SubmitReview = ({productId, rating, comment, setIsError, setError, setIsSuccess, setIsLoading}) => {
    const {t} = useTranslation();
    const handleSubmit = async () => {
        setIsLoading(true);
        if (comment.length === 0) {
            setIsError(true);
            setError(t('comment_empty'));
            setIsLoading(false);
        } else {
            const body = {
                productId: productId,
                rating: rating,
                comment: comment
            };
            await ReviewService.postReview(body)
                .then(() => setIsSuccess(true))
                .catch(error => {
                    setIsError(true);
                    setError(error.message);
                })
                .finally(() => setIsLoading(false));
        }
    }

    return (
        <div className={"button-container"}>
            <span onClick={handleSubmit}>
                <div className={"ratings-button submit-review-button"}>
                    {t('submit')}
                </div>
            </span>
        </div>
    );
};

export default SubmitReview;