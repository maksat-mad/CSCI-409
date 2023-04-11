import React from 'react';
import './ReviewCard.css';
import '../ratings-button/Ratings.css';
import UserService from "../../../service/user/UserService";

const InProgressCard = ({userRequest, accepted, cancel, lang, tg, setCancelId, setModalOpen, isAcceptChange, setIsAcceptChange, setIsLoading, total, tel}) => {
    const handleAcceptClick = async () => {
        setIsLoading(true);
        await UserService.acceptRequest(userRequest.id)
            .then(() => alert(userRequest.id + ' accepted successfully'))
            .catch(() => alert(userRequest.id + ' failed to accept'));
        setIsAcceptChange(!isAcceptChange);
    }

    const handleCancelClick = () => {
        setCancelId(userRequest.id)
        setModalOpen(true);
    }

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
                <div className={"container-ratings"} style={{flexWrap: "wrap"}}>
                    <div className={"button-container"}>
                        <span onClick={handleAcceptClick}>
                            <div className={"ratings-button leave-review-button"}>
                                {accepted}
                            </div>
                        </span>
                    </div>
                    <div className={"button-container"}>
                        <span onClick={handleCancelClick}>
                            <div className={"ratings-button grey-button"}>
                                {cancel}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InProgressCard;