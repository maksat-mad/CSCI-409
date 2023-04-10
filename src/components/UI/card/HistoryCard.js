import React from 'react';
import './ReviewCard.css';
import '../ratings-button/Ratings.css';

const HistoryCard = ({userRequest, tg, tel, lang, total}) => {
    return (
        <div className={"review-card"}>
            <div style={{overflowWrap:"anywhere"}}>
                <div className={"review-name-rating"}>
                    <h4>{userRequest.email}</h4>
                    <h4>{userRequest.purchaseDate}</h4>
                </div>
                <div className={"container-ratings"} style={{flexWrap: "wrap"}}>
                    <div>
                        {lang === 'en' ? <p>{userRequest.purchaseName.EN}</p>
                            : lang === 'kk' ? <p>{userRequest.purchaseName.KK}</p>
                                : <p>{userRequest.purchaseName.RU}</p>
                        }
                    </div>
                </div>
                <div className={"review-name-rating"}>
                    <p>{total}: {userRequest.price} {tg}</p>
                    <p>{tel}: {userRequest.costumerPhone}</p>
                </div>
            </div>
        </div>
    );
};

export default HistoryCard;