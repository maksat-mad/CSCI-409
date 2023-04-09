import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import cookies from "js-cookie";
import {useFetching} from "../../hook/useFetching";
import UserService from "../../service/user/UserService";
import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";
import {Link} from "react-router-dom";
import ExitButton from "../../components/UI/exit-button/ExitButton";
import HistoryCard from "../../components/UI/card/HistoryCard";

const BoughtHistory = () => {
    const {t} = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const [requests, setRequests] = useState([]);

    const [fetchRequests, isRequestsLoading, requestsError] = useFetching(async () => {
        const response = await UserService.getBoughtHistory();
        setRequests([...response]);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/bought-history');
        fetchRequests();
    }, []);

    return (
        <>
            {requests.length === 0
                ?
                <div className={"container"}>
                    <h1>{t('no_bought_history')}</h1>
                </div>
                :
                <>
                    <div className={"container"}>
                        {requestsError && <Error message={requestsError}/>}
                        {isRequestsLoading && <Loader/>}
                    </div>
                    <div className={"container"}>
                        <h1>{t('bought_history')}</h1>
                    </div>
                    <div className={"container"}>
                        <div>
                            {requests.map(request => {
                                return <HistoryCard
                                    userRequest={request}
                                    lang={currentLanguageCode}
                                    tg={t('tg')}
                                    total={t('total')}
                                    tel={t('tel')}
                                />
                            })}
                        </div>
                    </div>
                    <div className={"my-container"}>
                        <Link to="/profile">{t('cancel')}</Link>
                    </div>
                    <ExitButton link={"/profile"}/>
                </>
            }
        </>
    );
};

export default BoughtHistory;