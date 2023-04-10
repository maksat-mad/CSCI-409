import React from 'react';
import './ReviewCard.css';
import '../ratings-button/Ratings.css';
import UserService from "../../../service/user/UserService";

const UserCard = ({card, block, unblock, isChange, setIsChange, setIsLoading}) => {
    const handleBlockClick = async () => {
        setIsLoading(true);
        await UserService.blockUser(card.email)
            .then(() => console.log('blocked successfully'))
            .catch(() => console.log('failed to block'));
        setIsChange(!isChange);
    }

    const handleUnBlockClick = async () => {
        setIsLoading(true);
        await UserService.unblockUser(card.email)
            .then(() => console.log('unblocked successfully'))
            .catch(() => console.log('failed to unblock'));
        setIsChange(!isChange);
    }

    return (
        <div className={"review-card"}>
            <div style={{overflowWrap:"anywhere"}}>
                <div className={"review-name-rating"}>
                    <h4>{card.email}</h4>
                    <h4>{card.phone}</h4>
                </div>
                <div className={"container-ratings"} style={{flexWrap: "wrap"}}>
                    {card.isBlackList ?
                        <div className={"button-container"}>
                            <span onClick={handleUnBlockClick}>
                                <div className={"ratings-button leave-review-button"}>
                                    {unblock}
                                </div>
                            </span>
                        </div>
                        :
                        <div className={"button-container"}>
                            <span onClick={handleBlockClick}>
                                <div className={"ratings-button red-button"}>
                                    {block}
                                </div>
                            </span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserCard;