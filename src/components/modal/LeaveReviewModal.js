import React, {useEffect, useRef, useState} from 'react';
import './Modal.css';
import './LeaveReviewModal.css';
import SubmitReview from "../UI/ratings-button/SubmitReview";
import Loader from "../loader/Loader";
import {useTranslation} from "react-i18next";

const LeaveReviewModal = ({setIsOpen, productId}) => {
    const {t} = useTranslation();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(false);
    const [comment, setComment] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const modalRef = useRef();

    useEffect(() => {
        let closeModal = (event) => {
            if (!modalRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", closeModal);
        return () => {
            document.removeEventListener("mousedown", closeModal);
        };
    });

    const handleCommentChange = (event) => {
        setComment(event.target.value);
        setIsError(false);
    }

    return (
        <div className="modal">
            <div ref={modalRef} className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                    <h2>{t('leave_review')}</h2>
                </div>
                <div className="modal-body">
                    <div>
                        <div className={"container-review"}>
                            {isLoading ?
                                <Loader/>
                                :
                                isSuccess ?
                                    <div className={"input-success"}>
                                        <h3>{t('successfully_added_review')}</h3>
                                    </div>
                                    :
                                    <>
                                        <div>
                                            <h4 className={"container-review"}>{rating} {rating === 1 ? t("star") : t("stars")}</h4>
                                            <div className={"container-ratings big-font-size"}>
                                                {[...Array(5)].map((star, i) => {
                                                    const ratingValue = i + 1;
                                                    return <span
                                                        onClick={() => setRating(ratingValue)}
                                                        onMouseOver={() => setHover(ratingValue)}
                                                        onMouseOut={() => setHover(null)}
                                                        className={"fa fa-star " + ((ratingValue <= (hover || rating)) ? "checked" : "")}></span>;
                                                })}
                                            </div>
                                        </div>
                                        <textarea className={"medium-font-size"}
                                                  placeholder={t('leave_comment')}
                                                  onChange={handleCommentChange}
                                        ></textarea>
                                    </>
                            }
                        </div>
                        {!isSuccess && !isLoading &&
                            <>
                                <SubmitReview productId={productId}
                                              rating={rating}
                                              comment={comment}
                                              setIsError={setIsError}
                                              setError={setError}
                                              setIsSuccess={setIsSuccess}
                                              setIsLoading={setIsLoading}
                                />
                                {isError &&
                                    <div className={"container input-error"}>
                                        (!) {error}
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveReviewModal;