import React, {useEffect, useState} from 'react';
import '../Admin.css';
import {useTranslation} from "react-i18next";
import {useFetching} from "../../../hook/useFetching";
import UserService from "../../../service/user/UserService";
import Loader from "../../../components/loader/Loader";
import Error from "../../../components/error/Error";
import UserCard from "../../../components/UI/card/UserCard";
import {Link} from "react-router-dom";
import ExitButton from "../../../components/UI/exit-button/ExitButton";

const UserManagement = () => {
    const {t} = useTranslation();
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isChange, setIsChange] = useState(true);

    const [fetchUsers, isUsersLoading, usersError] = useFetching(async () => {
        setIsLoading(true);
        const response = await UserService.getUser(query);
        setUsers([...response.data]);
        setIsLoading(false);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem('path', '/user-management');
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [query, isChange]);

    const handleInputChange = () => {
        setQuery(query);
    }

    return (
        <>
            <div className={"container"}>
                <h1>{t('user_management')}</h1>
            </div>
            <div className={"container"}>
                <input
                    onChange={handleInputChange}
                    type="text" className={"admin-search"}
                    placeholder={t('search')} autoComplete={"off"}
                />
            </div>
            {isLoading ?
                <div className={"container"}>
                    <Loader/>
                </div>
                :
                <>
                    {users.length === 0
                        ?
                        <div className={"container"}>
                            <h1>{t('not_found')}</h1>
                        </div>
                        :
                        <>
                            <div className={"container"}>
                                {usersError && <Error message={usersError}/>}
                                {isUsersLoading && <Loader/>}
                            </div>
                            <div className={"container"}>
                                <div>
                                    {users.map(user => {
                                        return <UserCard
                                            card={user}
                                            block={t('block')}
                                            unblock={t('unblock')}
                                            isChange={isChange}
                                            setIsChange={setIsChange}
                                            setIsLoading={setIsLoading}
                                        />
                                    })}
                                    <div className={"my-container"}>
                                        <Link to="/profile">{t('cancel')}</Link>
                                    </div>
                                    <ExitButton link={"/profile"}/>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    );
};

export default UserManagement;