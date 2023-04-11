import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {useFetching} from "../../hook/useFetching";
import UserService from "../../service/user/UserService";
import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";
import {Link} from "react-router-dom";
import AreYouSureModal from "../../components/modal/AreYouSureModal";
import InProgressCard from "../../components/UI/card/InProgressCard";
import cookies from "js-cookie";
import ExitButton from "../../components/UI/exit-button/ExitButton";

const InProgress = () => {
    const {t} = useTranslation();
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const [requests, setRequests] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [cancelId, setCancelId] = useState(-1);
    const [isCancelChange, setIsCancelChange] = useState(false);
    const [isAcceptChange, setIsAcceptChange] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [fetchRequests, isRequestsLoading, requestsError] = useFetching(async () => {
        setIsLoading(true);
        const response = await UserService.getRequests();
        setRequests([...response]);
        setIsLoading(false);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/in-progress');
        fetchRequests();
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [isAcceptChange]);

    useEffect(async () => {
        if (cancelId === -1) {
            return;
        }
        setIsLoading(true);
        await UserService.cancelRequest(cancelId)
            .then(() => alert(cancelId + ' cancelled successfully'))
            .catch(() => alert(cancelId + ' failed to cancel'));
        fetchRequests();
        setIsLoading(false);
    }, [isCancelChange]);

    return (
        <>
            <ExitButton link={"/profile"}/>
            {isLoading ?
                <div className={"container"}>
                    <Loader/>
                </div>
                :
                <>
                    {requests.length === 0
                        ?
                        <div className={"container"}>
                            <h1>{t('no_requests_to_buy')}</h1>
                        </div>
                        :
                        <>
                            <div className={"container"}>
                                {requestsError && <Error message={requestsError}/>}
                                {isRequestsLoading && <Loader/>}
                            </div>
                            <div className={"container"}>
                                <h1>{t('requests_to_buy')}</h1>
                            </div>
                            <div className={"container"}>
                                <div>
                                    {requests.map(request => {
                                        return <InProgressCard
                                            userRequest={request}
                                            accepted={t('accepted')}
                                            cancel={t('cancel')}
                                            lang={currentLanguageCode}
                                            tg={t('tg')}
                                            setCancelId={setCancelId}
                                            setModalOpen={setModalOpen}
                                            isAcceptChange={isAcceptChange}
                                            setIsAcceptChange={setIsAcceptChange}
                                            setIsLoading={setIsLoading}
                                            total={t('total')}
                                            tel={t('tel')}
                                        />
                                    })}
                                </div>
                            </div>
                            <div className={"my-container"}>
                                <Link to="/profile">{t('cancel')}</Link>
                            </div>
                            {modalOpen &&
                                <AreYouSureModal
                                    yes={t('yes')}
                                    no={t('no')}
                                    areYouSure={t('areYouSure')}
                                    setIsOpen={setModalOpen}
                                    isChange={isCancelChange}
                                    setIsChange={setIsCancelChange}
                                />
                            }
                        </>
                    }
                </>
            }
        </>
    );
};

export default InProgress;