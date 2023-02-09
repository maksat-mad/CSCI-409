import React from 'react';
import './Ratings.css';
import {useAuth} from "../../../context/AuthContext";
import ReviewService from "../../../service/review/ReviewService";

const SubmitReview = ({productId, rating, comment, setIsError, setError, setIsSuccess, setIsLoading}) => {
    const {currentUser} = useAuth();
    const handleSubmit = async () => {
        setIsLoading(true);
        if (comment.length === 0) {
            setIsError(true);
            setError("Comment is empty");
            setIsLoading(false);
        } else {
            const body = {
                productId: productId,
                currentUser: currentUser,
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
                    Submit
                </div>
            </span>
        </div>
    );
};

export default SubmitReview;