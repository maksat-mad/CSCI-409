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
                        {lang === 'en' ? userRequest.purchaseName.additionalProp1.map((detail, index) => {
                            return <p>{index + 1}) {detail}</p>
                        }) : lang === 'kk' ? userRequest.detailsKk.purchaseName.additionalProp2.map((detail, index) => {
                            return <p>{index + 1}) {detail}</p>
                        }) : userRequest.detailsRu.purchaseName.additionalProp3.map((detail, index) => {
                            return <p>{index + 1}) {detail}</p>
                        })}
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